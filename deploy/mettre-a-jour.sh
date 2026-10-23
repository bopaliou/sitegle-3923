#!/usr/bin/env bash
# Met à jour le site GLE à partir du dépôt du propriétaire (modifié via Runable),
# vérifie que les réglages de l'hébergement mutualisé sont intacts, recompile
# et prépare l'archive à envoyer dans public_html.
#
# Usage (Git Bash, depuis n'importe quel dossier) :
#   bash deploy/mettre-a-jour.sh            # demande avant de pousser sur le fork
#   bash deploy/mettre-a-jour.sh --push     # pousse sur le fork sans demander
#   bash deploy/mettre-a-jour.sh --no-merge # recompile sans récupérer upstream

set -euo pipefail

UPSTREAM_URL="https://github.com/MbayKebe/sitegle-3923.git"
BRANCH="main"
WEB="packages/web"
ZIP="deploy/site-gle-public_html.zip"

PUSH="ask"
MERGE=1
for arg in "$@"; do
  case "$arg" in
    --push) PUSH="yes" ;;
    --no-merge) MERGE=0 ;;
    -h|--help) sed -n '2,10p' "$0"; exit 0 ;;
    *) echo "Option inconnue : $arg" >&2; exit 2 ;;
  esac
done

cd "$(dirname "$0")/.."

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }
fail() { printf '\n\033[1;31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

# ------------------------------------------------------------------ préalables

step "Vérifications préalables"
[ "$(git rev-parse --abbrev-ref HEAD)" = "$BRANCH" ] || fail "Placez-vous sur la branche $BRANCH (git checkout $BRANCH)."
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  git status --short --untracked-files=no
  fail "Des modifications ne sont pas commitées. Commitez-les ou mettez-les de côté (git stash) avant de lancer le script."
fi
command -v bun >/dev/null || fail "Bun est introuvable (https://bun.sh)."
ok "branche $BRANCH propre"

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "$UPSTREAM_URL"
  ok "dépôt du propriétaire ajouté sous le nom « upstream »"
fi
# Le dépôt du propriétaire reste en lecture seule depuis ce poste.
git remote set-url --push upstream NE_PAS_POUSSER_ICI

# --------------------------------------------------- modifications du propriétaire

if [ "$MERGE" = 1 ]; then
  step "Récupération des modifications du propriétaire (upstream/$BRANCH)"
  git fetch upstream "$BRANCH"
  INCOMING=$(git rev-list --count "HEAD..upstream/$BRANCH")
  if [ "$INCOMING" = 0 ]; then
    ok "aucune nouvelle modification"
  else
    git log --oneline "HEAD..upstream/$BRANCH" | sed 's/^/    /'
    if ! git merge --no-edit "upstream/$BRANCH"; then
      echo
      git diff --name-only --diff-filter=U | sed 's/^/    conflit : /'
      fail "Conflit de fusion. Résolvez les fichiers ci-dessus puis « git commit », ou annulez avec « git merge --abort », puis relancez le script."
    fi
    ok "$INCOMING commit(s) intégré(s)"
  fi
fi

# ------------------------------------------------- réglages de l'hébergement

step "Contrôle des réglages de l'hébergement mutualisé"
for f in "$WEB/public/contact.php" "$WEB/public/.htaccess" "$WEB/vite/sitemap-plugin.ts" "$WEB/src/web/queries/contact.ts"; do
  [ -f "$f" ] || fail "Fichier manquant : $f (supprimé côté Runable ?). Restaurez-le avec : git checkout HEAD~1 -- $f"
done
grep -q '"/contact.php"' "$WEB/src/web/queries/contact.ts" \
  || fail "$WEB/src/web/queries/contact.ts n'appelle plus /contact.php : le formulaire ne fonctionnera pas sur l'hébergement."
grep -q 'sitemapPlugin()' "$WEB/vite.config.ts" \
  || fail "sitemapPlugin() n'est plus branché dans $WEB/vite.config.ts."
ok "formulaire, .htaccess et sitemap en place"

# Le suivi Runable peut revenir après une modification sur Runable : on le retire.
FIXED=0
if grep -q 'runableAnalyticsPlugin' "$WEB/vite.config.ts"; then
  sed -i '/runable-analytics-plugin/d; /runableAnalyticsPlugin()/d' "$WEB/vite.config.ts"
  git add "$WEB/vite.config.ts"
  FIXED=1
  warn "plugin de suivi Runable retiré de vite.config.ts"
fi
if [ -f "$WEB/public/runable.js" ]; then
  git rm -q "$WEB/public/runable.js"
  FIXED=1
  warn "public/runable.js supprimé"
fi
if [ "$FIXED" = 1 ]; then
  git commit -q -m "Retire le suivi Runable pour l'hébergement mutualisé"
  ok "correction commitée"
else
  ok "pas de suivi Runable"
fi

# ----------------------------------------------------------------- compilation

step "Installation des dépendances"
# Les paquets mobile/desktop échouent parfois sous Windows (chemins trop longs) ;
# seul le site compte ici, et la compilation ci-dessous valide le résultat.
bun install || warn "bun install a signalé des erreurs, on tente quand même la compilation"

step "Compilation du site"
rm -rf "$WEB/dist"
(cd "$WEB" && bunx vite build)

for f in index.html .htaccess contact.php sitemap.xml robots.txt; do
  [ -f "$WEB/dist/$f" ] || fail "dist/$f absent après la compilation."
done
[ -f "$WEB/dist/runable.js" ] && fail "dist/runable.js est présent : le suivi Runable n'a pas été retiré."
ok "dist/ complet"

# ------------------------------------------------------------------- archive

step "Création de l'archive $ZIP"
rm -f "$ZIP"
if command -v zip >/dev/null; then
  (cd "$WEB/dist" && zip -qr "../../../$ZIP" .)
elif command -v python >/dev/null || command -v python3 >/dev/null; then
  "$(command -v python || command -v python3)" - "$WEB/dist" "$ZIP" <<'EOF'
import os, sys, zipfile
src, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(src):
        for name in files:
            path = os.path.join(root, name)
            z.write(path, os.path.relpath(path, src).replace(os.sep, "/"))
EOF
else
  tar -a -c -f "$ZIP" -C "$WEB/dist" .
fi
ok "$ZIP ($(du -h "$ZIP" | cut -f1))"

# ------------------------------------------------------------- sauvegarde fork

AHEAD=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo "?")
if [ "$AHEAD" != 0 ]; then
  step "Sauvegarde sur votre fork (origin/$BRANCH) : $AHEAD commit(s) à pousser"
  if [ "$PUSH" = "ask" ]; then
    read -r -p "  Pousser maintenant ? (o/N) " answer || answer=""
    if [[ "$answer" =~ ^[oOyY]$ ]]; then PUSH="yes"; fi
  fi
  if [ "$PUSH" = "yes" ]; then
    git push origin "$BRANCH"
    ok "fork à jour"
  else
    warn "non poussé (plus tard : git push origin $BRANCH)"
  fi
fi

cat <<EOF

$(printf '\033[1;32m')Terminé.$(printf '\033[0m') Pour mettre en ligne :
  1. cPanel → Gestionnaire de fichiers → public_html
  2. Téléverser $ZIP puis « Extraire » (écraser les fichiers existants)
  3. Ne pas supprimer contact-config.php ; supprimer l'archive après extraction
  4. Recharger le site avec Ctrl + F5 et tester le formulaire /contact
EOF
