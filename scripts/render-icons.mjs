import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const context = await browser.newContext({ deviceScaleFactor: 1 });
const page = await context.newPage();
const svg = await readFile(
  new URL("../public/icon.svg", import.meta.url),
  "utf8",
);
for (const size of [192, 512]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%}svg{width:100%;height:100%;display:block}</style>${svg}`,
  );
  await page.screenshot({ path: `public/icon-${size}.png` });
}
for (const [dpi, size] of [
  ["mdpi", 48],
  ["hdpi", 72],
  ["xhdpi", 96],
  ["xxhdpi", 144],
  ["xxxhdpi", 192],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%;background:#c6ef8b}svg{width:100%;height:100%}</style>${svg}`,
  );
  for (const file of ["ic_launcher", "ic_launcher_round"])
    await page.screenshot({
      path: `android/app/src/main/res/mipmap-${dpi}/${file}.png`,
    });
  const foreground = size * 2.25;
  await page.setViewportSize({ width: foreground, height: foreground });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%;background:#c6ef8b}svg{position:absolute;width:62%;height:62%;left:19%;top:19%}</style>${svg}`,
  );
  await page.screenshot({
    path: `android/app/src/main/res/mipmap-${dpi}/ic_launcher_foreground.png`,
  });
}
await browser.close();
console.log(
  "Rendered Penny Pilot web and Android icons from the original Mia SVG.",
);
