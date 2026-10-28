/**
 * Tells IndexNow search engines (Bing — which also feeds ChatGPT search,
 * Copilot and DuckDuckGo — plus Yandex, Seznam and Naver) that the site's
 * pages changed, instead of waiting for them to recrawl.
 *
 * Run after a production deploy:  pnpm indexnow
 * The key file public/<key>.txt proves we own the domain.
 */
const HOST = "bafata-agri.com";
const KEY = "97f1957272e853192aefcfc5ba7450a8";

const res = await fetch(`https://${HOST}/sitemap.xml`);
const urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} ${r.statusText} — ${urls.length} URLs`);
console.log(urls.join("\n"));
if (!r.ok && r.status !== 202) process.exit(1);
