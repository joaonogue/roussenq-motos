import fs from "node:fs/promises";
import path from "node:path";
import { render } from "../.ssr/entry-server.js";
const config = JSON.parse(await fs.readFile("data/site.json", "utf8"));
const motos = JSON.parse(await fs.readFile("data/motos.json", "utf8"));
const base = process.env.BASE_PATH || config.basePath;
if (!base.startsWith("/") || !base.endsWith("/"))
  throw new Error("basePath precisa começar e terminar com /");
const origin = (process.env.SITE_URL || config.siteUrl).replace(/\/$/, "");
if (origin && !/^https:\/\//.test(origin))
  throw new Error("siteUrl deve usar https://");
const production = !config.demo && !!origin;
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const template = await fs.readFile("dist/index.html", "utf8");
const routes = [
  {
    route: "",
    title: "ROUSSENQ MOTOS — Catálogo de motos. Imaruí, SC",
    description:
      "Conheça a Roussenq Motos em Imaruí, Santa Catarina. Explore motocicletas e converse diretamente pelo WhatsApp.",
  },
  {
    route: "estoque/",
    title: "Estoque de motos | ROUSSENQ MOTOS — Imaruí, SC",
    description:
      "Explore o catálogo Roussenq Motos. Filtre por marca, ano, valor, cilindrada, quilometragem e disponibilidade.",
  },
  ...motos.map((m) => ({
    route: `motos/${m.slug}/`,
    title: `${m.modelo} ${m.anoModelo} | ROUSSENQ MOTOS`,
    description: m.descricao,
    moto: m,
  })),
  {
    route: "404.html",
    title: "Página não encontrada | ROUSSENQ MOTOS",
    description: "Volte ao catálogo da Roussenq Motos.",
  },
];
const slugs = new Set();
for (const m of motos) {
  if (slugs.has(m.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.slug))
    throw new Error(`Slug inválido ou duplicado: ${m.slug}`);
  slugs.add(m.slug);
  if (!["disponivel", "reservada", "vendida"].includes(m.status))
    throw new Error(`Status inválido: ${m.status}`);
  if (!m.imagens.length || !m.descricao)
    throw new Error(`Cadastro incompleto: ${m.slug}`);
  for (const img of m.imagens) {
    await fs.access(path.join("public", img));
    await fs.access(path.join("public", img.replace(".webp", "-640.webp")));
  }
  if (!config.demo && m.demo)
    throw new Error(
      "Remova os cadastros demonstrativos antes de desativar demo.",
    );
}
for (const r of routes) {
  const url = origin + base + r.route;
  const noindex = !production || r.route === "404.html";
  const image = r.moto?.imagens[0];
  const seo = `<meta name="description" content="${esc(r.description)}"/><meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}"/><meta property="og:type" content="website"/><meta property="og:locale" content="pt_BR"/><meta property="og:site_name" content="ROUSSENQ MOTOS"/><meta property="og:title" content="${esc(r.title)}"/><meta property="og:description" content="${esc(r.description)}"/>${origin ? `<link rel="canonical" href="${esc(url)}"/><meta property="og:url" content="${esc(url)}"/>` : ""}${origin && image ? `<meta property="og:image" content="${esc(origin + base + image)}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="${esc(origin + base + image)}"/>` : ""}<meta name="twitter:title" content="${esc(r.title)}"/><meta name="twitter:description" content="${esc(r.description)}"/>${r.route === "" ? `<link rel="preload" as="image" href="${base}assets/editorial/fachada-conceito.webp"/>` : ""}${origin && r.route === "" ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "MotorcycleDealer", name: config.name, url: origin + base, telephone: "+" + config.phone, address: { "@type": "PostalAddress", addressLocality: "Imaruí", addressRegion: "SC", addressCountry: "BR" } }).replace(/</g, "\\u003c")}</script>` : ""}`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace("<!--seo-->", seo)
    .replace("<!--app-->", render(base + r.route));
  const out =
    r.route === "404.html"
      ? "dist/404.html"
      : path.join("dist", r.route, "index.html");
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html);
}
await fs.writeFile("dist/.nojekyll", "");
await fs.writeFile(
  "dist/robots.txt",
  production
    ? `User-agent: *\nAllow: /\nSitemap: ${origin + base}sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
    production
      ? routes
          .filter((r) => r.route !== "404.html")
          .map((r) => `<url><loc>${esc(origin + base + r.route)}</loc></url>`)
          .join("")
      : ""
  }</urlset>`,
);
console.log(
  `Pré-renderização concluída: ${routes.length} páginas. Base: ${base}. SEO público: ${production ? "sim" : "não (prévia)"}.`,
);

