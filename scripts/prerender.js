// scripts/prerender.js
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const BUILD = path.resolve(__dirname, "../build");
const SITE = (process.env.REACT_APP_APP_URL || "https://www.selectsafarisafrica.com").replace(/\/$/, "");
const PORT = 45678;
const ORIGIN = `http://localhost:${PORT}`;
const ALLOWED_ORIGINS = (process.env.PRERENDER_ALLOW_ORIGINS || "").split(",").filter(Boolean); // your API origin(s)
const SEED = require("./prerender-routes.json");
const EXCLUDE = [/^\/home$/, /^\/booking(\/|$)/, /^\/invoice(\/|$)/];
const isExcluded = (r) => EXCLUDE.some((re) => re.test(r));

const SHELL = path.join(BUILD, "200.html");
if (!fs.existsSync(SHELL)) fs.copyFileSync(path.join(BUILD, "index.html"), SHELL);

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".txt": "text/plain", ".xml": "application/xml", ".map": "application/json",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(BUILD, urlPath);
  if (!file.startsWith(BUILD)) { res.writeHead(403); return res.end(); }
  const isAsset = fs.existsSync(file) && fs.statSync(file).isFile() && path.extname(file) && !file.endsWith("index.html");
  if (!isAsset) file = SHELL; // SPA fallback is always the pristine shell
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

const normalize = (r) => {
  const clean = r.split("#")[0].split("?")[0];
  return clean === "/" ? "/" : clean.replace(/\/+$/, "");
};
const toUrl = (route) => ORIGIN + (route === "/" ? "/" : route + "/");
const outFile = (route) => (route === "/" ? path.join(BUILD, "index.html") : path.join(BUILD, route, "index.html"));

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: "en-US" });

  await context.addInitScript(() => {
    window.__PRERENDER__ = true;
    window.SC_DISABLE_SPEEDY = true; // styled-components writes CSS text so it serializes into the snapshot
  });

  const queue = SEED.map(normalize);
  const seen = new Set();
  const done = [];
  const failures = [];

  while (queue.length) {
    const route = queue.shift();
    if (seen.has(route) || isExcluded(route)) continue;
    seen.add(route);

    const page = await context.newPage();
    await page.route("**/*", async (route_) => {
      const url = route_.request().url();
      if (url.startsWith(ORIGIN) || url.startsWith("data:")) return route_.continue();
      if (ALLOWED_ORIGINS.some((o) => url.startsWith(o))) {
        try {
          // Fetch from Node (no CORS) and add CORS headers for the localhost page.
          const resp = await route_.fetch();
          return route_.fulfill({
            response: resp,
            headers: { ...resp.headers(), "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true" },
          });
        } catch { return route_.abort(); }
      }
      return route_.abort(); // gtag, Maps, GSI, external fonts...
    });
    page.on("pageerror", (e) => console.warn(`  [pageerror] ${route}: ${e.message}`));

    try {
      await page.goto(toUrl(route), { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForFunction(
        () =>
          document.querySelector("#root")?.children.length > 0 &&
          !document.querySelector("[data-loading-spinner], body[data-prerender-pending]"),
        null,
        { timeout: 20000 }
      );
      // react-helmet-async applies head changes on requestAnimationFrame
      await page.waitForSelector('link[rel="canonical"]', { state: "attached", timeout: 5000 })
        .catch(() => console.warn(`  [warn] ${route}: no canonical (missing <Seo>?)`));
      await page.waitForTimeout(150);

      const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
      links
        .filter((h) => h && h.startsWith("/") && !h.startsWith("//") && !path.extname(h.split("?")[0].split("#")[0]))
        .map(normalize)
        .forEach((h) => !seen.has(h) && !isExcluded(h) && queue.push(h));

      const html = "<!DOCTYPE html>" + (await page.evaluate(() => document.documentElement.outerHTML));
      const file = outFile(route);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
      done.push(route);
      console.log(`✔ ${route}  (${(html.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      failures.push(route);
      console.error(`✘ ${route}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  const urls = done.map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r + "/"}</loc></url>`).join("\n");
  fs.writeFileSync(
    path.join(BUILD, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );

  await browser.close();
  server.close();
  if (failures.length) { console.error(`\n${failures.length} route(s) failed`); process.exit(1); }
  console.log(`\nPre-rendered ${done.length} routes`);
})();