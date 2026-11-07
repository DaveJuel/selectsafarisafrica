// scripts/verify-prerender.js
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const BUILD = path.resolve(__dirname, "../build");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );

// Only prerendered pages (200.html is the SPA shell and is intentionally excluded)
const pages = walk(BUILD).filter((f) => f.endsWith("index.html"));

const stripCode = (html) =>
  html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");

const titles = new Map();
let bad = 0;

for (const file of pages) {
  const rel = path.relative(BUILD, file);
  const h = fs.readFileSync(file, "utf8");
  const body = stripCode(h);
  const get = (re) => (h.match(re) || [])[1];

  const checks = {
    title: get(/<title[^>]*>([^<]+)<\/title>/),
    description: get(/<meta[^>]+name="description"[^>]+content="([^"]+)"/),
    canonical: get(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/),
    ogTitle: /<meta[^>]+property="og:title"/.test(h) ? "ok" : undefined,
    h1: get(/<h1[^>]*>([\s\S]*?)<\/h1>/),
    styles: /<style[^>]*data-styled[^>]*>[^<]{20,}/.test(h) ? "ok" : undefined,
  };

  const problems = Object.entries(checks)
    .filter(([, v]) => !v)
    .map(([k]) => `missing ${k}`);

  if (/data-loading-spinner/.test(h)) problems.push("spinner left in snapshot");
  // Text-only element whose content is a snake_case i18n key, e.g. >who_we_are<
  if (/>\s*[a-z]+(_[a-z0-9]+)+\s*</.test(body)) problems.push("raw i18n key in content");
  if (/localhost:45678/.test(body)) problems.push("localhost URL leaked");

  if (checks.title) titles.set(checks.title, [...(titles.get(checks.title) || []), rel]);

  if (problems.length) {
    bad++;
    console.error(`✘ ${rel}: ${problems.join(", ")}`);
  } else {
    console.log(`✔ ${rel}`);
  }
}

for (const [title, files] of titles) {
  if (files.length > 1) {
    bad++;
    console.error(`✘ duplicate title "${title}" in: ${files.join(", ")}`);
  }
}

if (bad) {
  console.error(`\n${bad} verification problem(s)`);
  process.exit(1);
}
console.log(`\nVerified ${pages.length} pages`);