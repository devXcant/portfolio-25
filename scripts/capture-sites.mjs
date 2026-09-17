import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public/sites");

const sites = [
  ["openpulse", "https://openpulse-eight.vercel.app/"],
  ["apeing-poly-predict", "https://apeing-poly-predict.vercel.app/"],
  ["apeing-trade", "https://trade.apeing.ai/"],
  ["apeing-prize-market", "https://prize-market-staging.vercel.app/"],
  ["gefeafrica", "https://www.gefeafrica.com/"],
  ["kwalede", "https://kwaledeonline-frontend-user.onrender.com/users"],
  ["ola", "https://www.ozura.dev/"],
  ["store", "https://store-nocms.vercel.app/"],
  ["stabley", "https://stabley.onrender.com/"],
  ["auto-doc-gen", "https://www.npmjs.com/package/@devxcant/auto-doc-gen"],
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const [id, url] of sites) {
  const file = path.join(outDir, `${id}.png`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: file, type: "png" });
    console.log("ok", id);
  } catch (error) {
    console.log("fail", id, error instanceof Error ? error.message : error);
  }
}

await browser.close();
