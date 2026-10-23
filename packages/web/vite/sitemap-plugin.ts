import type { Plugin } from "vite";
import { posts, projects, services } from "../src/web/lib/site-data";

// Génère sitemap.xml et robots.txt au build à partir de site-data.ts, pour que
// les nouvelles pages (services, réalisations, articles) y figurent d'office.
// URL publique : SITE_URL si définie (fichier .env à la racine), sinon le domaine GLE.
export default function sitemapPlugin(): Plugin {
  return {
    name: "gle-sitemap",
    apply: "build",
    generateBundle() {
      const origin = (process.env.SITE_URL || "https://globalengineering.sn").replace(/\/+$/, "");

      const pages: { path: string; lastmod?: string }[] = [
        { path: "/" },
        { path: "/services" },
        ...services.map((s) => ({ path: `/services/${s.slug}` })),
        { path: "/realisations" },
        ...projects.map((p) => ({ path: `/realisations/${p.slug}` })),
        { path: "/mediatheque" },
        { path: "/a-propos" },
        { path: "/blog" },
        ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
        { path: "/contact" },
      ];

      const urls = pages
        .map(
          ({ path, lastmod }) =>
            `  <url><loc>${origin}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
        )
        .join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nDisallow: /audit\nDisallow: /contact.php\n\nSitemap: ${origin}/sitemap.xml\n`,
      });
    },
  };
}
