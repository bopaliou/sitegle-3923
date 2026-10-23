# Déploiement sur l'hébergement mutualisé (cPanel / Apache / PHP)

Le site est publié en **fichiers statiques** + un script PHP pour le formulaire.
Aucun Node.js, Bun ou PM2 n'est nécessaire sur le serveur.

## 1. Compiler (sur votre poste)

```bash
bun install
bun run build:web        # produit packages/web/dist/
```

Pour un autre domaine que `globalengineering.sn`, définir `SITE_URL=https://votre-domaine`
dans le fichier `.env` à la racine avant de compiler (utilisé par sitemap.xml et robots.txt).

## 2. Envoyer les fichiers

Envoyer **le contenu** de `packages/web/dist/` dans `public_html/` (FTP ou gestionnaire
de fichiers cPanel), ou téléverser `deploy/site-gle-public_html.zip` puis « Extraire ».
Vérifier que le fichier caché `.htaccess` est bien présent.

## 3. Configurer le formulaire de contact

1. Créer dans cPanel la boîte e-mail expéditrice (ex. `no-reply@globalengineering.sn`).
2. Copier `deploy/contact-config.example.php` dans `public_html/contact-config.php`
   et le compléter, en particulier le mot de passe SMTP de cette boîte : l'envoi
   par `mail()` de PHP échoue sur cet hébergement.
   En cas de souci, cPanel → Journal des erreurs : les lignes `[contact]` en donnent la cause.
3. *(Facultatif)* Enregistrer aussi les demandes en base : créer une base MySQL et
   un utilisateur dans cPanel, importer `deploy/schema.sql` via phpMyAdmin, puis
   renseigner la section `db` du fichier de configuration.

## 4. Activer HTTPS

Installer le certificat SSL (Let's Encrypt / AutoSSL dans cPanel), puis décommenter les
deux lignes « Forcer HTTPS » au début de `public_html/.htaccess`.

## 5. Vérifier

- `https://votre-domaine/services/eolien` s'affiche directement (pas de 404).
- Envoyer une demande depuis `/contact` et vérifier sa réception.
- `https://votre-domaine/sitemap.xml` répond, puis le déclarer dans Google Search Console.

## Mises à jour

Le propriétaire modifie le site sur Runable, qui alimente son dépôt
`MbayKebe/sitegle-3923`. Ce dépôt-ci est un fork qui ajoute les réglages de
l'hébergement. Pour intégrer ses modifications, vérifier les réglages,
recompiler et préparer l'archive en une commande (Git Bash) :

```bash
bash deploy/mettre-a-jour.sh          # --push pour pousser sur le fork sans demander
```

Puis téléverser `deploy/site-gle-public_html.zip` dans `public_html/` et l'extraire,
**sans supprimer** `contact-config.php`.
