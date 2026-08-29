import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const svgPath = path.resolve("public/winnet-icon-square-512.svg");
const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  console.log("Generating PNG icons from SVG...");

  // 16x16
  await sharp(svgBuffer).resize(16, 16).png().toFile(path.resolve("public/favicon-16x16.png"));

  // 32x32
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.resolve("public/favicon-32x32.png"));

  // 48x48
  await sharp(svgBuffer).resize(48, 48).png().toFile(path.resolve("public/favicon-48x48.png"));

  // 180x180 Apple touch icon
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.resolve("public/apple-touch-icon.png"));

  // 192x192 Android / PWA
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.resolve("public/icon-192x192.png"));

  // 512x512 Android / PWA / Windows
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.resolve("public/icon-512x512.png"));

  // Create favicon.ico from 32x32 png
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.resolve("public/favicon.ico"), png32);

  console.log("All icons generated successfully!");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
