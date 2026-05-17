#!/usr/bin/env node
/**
 * ruriroo._ — Add New Artwork Script
 * ─────────────────────────────────────────────
 * Run: node add-artwork.mjs
 * Then answer the prompts → auto-adds to site + pushes to GitHub → Vercel deploys!
 */

import readline from "readline";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ARTWORK_DIR = path.join(__dirname, "public", "artwork");
const ARTWORKS_TS = path.join(__dirname, "src", "data", "artworks.ts");

const CATEGORIES = ["portraits", "figures", "watercolor", "fantasy", "mixed", "nature", "studies"];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function generateId(length = 11) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function copyImage(src, destDir, index, total) {
  const ext = path.extname(src).toLowerCase();
  const id = path.basename(destDir);
  const filename = total === 1 ? `${id}${ext}` : `${id}_${index + 1}${ext}`;
  const dest = path.join(destDir, filename);
  fs.copyFileSync(src, dest);
  return `/artwork/${id}/${filename}`;
}

async function main() {
  console.log("\n✦ ────────────────────────────────────────────────");
  console.log("  ruriroo._ — Add New Artwork");
  console.log("✦ ────────────────────────────────────────────────\n");

  // Title
  const title = (await ask("  Title of the artwork: ")).trim() || "Untitled";

  // Category
  console.log(`\n  Categories: ${CATEGORIES.join(", ")}`);
  let category = (await ask("  Category (or press Enter for 'mixed'): ")).trim().toLowerCase();
  if (!CATEGORIES.includes(category)) category = "mixed";

  // Description
  const description = (await ask("\n  Description (optional, press Enter to skip): ")).trim();

  // Tags
  const tagsInput = (await ask("  Tags (comma-separated, e.g. pencil,portrait,stars): ")).trim();
  const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()).filter(Boolean) : [];

  // Featured
  const featuredInput = (await ask("\n  Feature on homepage? (y/n, default n): ")).trim().toLowerCase();
  const featured = featuredInput === "y";

  // Image files
  console.log("\n  ────────────────────────────────────────────────");
  console.log("  Image file(s) — drag & drop the file into terminal,");
  console.log("  or type the full path. For multiple images, enter one per line.");
  console.log("  Press Enter twice when done.\n");

  const imagePaths = [];
  while (true) {
    const imgInput = (await ask(`  Image ${imagePaths.length + 1} path (Enter to finish): `)).trim()
      .replace(/^['"]|['"]$/g, "") // strip quotes from drag-drop
      .replace(/\\ /g, " ");        // handle escaped spaces
    if (!imgInput) break;
    if (!fs.existsSync(imgInput)) {
      console.log(`  ✗ File not found: ${imgInput}`);
      continue;
    }
    imagePaths.push(imgInput);
    console.log(`  ✓ Added: ${path.basename(imgInput)}`);
  }

  if (imagePaths.length === 0) {
    console.log("\n  ✗ No images provided. Exiting.\n");
    rl.close();
    return;
  }

  rl.close();

  // Generate ID + copy images
  const id = generateId();
  const destDir = path.join(ARTWORK_DIR, id);
  fs.mkdirSync(destDir, { recursive: true });

  console.log("\n  Copying images...");
  const imageSrcPaths = imagePaths.map((src, i) => copyImage(src, destDir, i, imagePaths.length));
  console.log(`  ✓ ${imagePaths.length} image(s) copied to public/artwork/${id}/`);

  // Build artworks.ts entry
  const year = new Date().getFullYear();
  const tagsStr = tags.length > 0 ? `["${tags.join('", "')}"]` : "[]";
  const entry = `  {
    id: "${id}",
    title: "${title.replace(/"/g, '\\"')}",
    category: "${category}",
    description: "${description.replace(/"/g, '\\"')}",
    tags: ${tagsStr},
    year: ${year},
    imageCount: ${imageSrcPaths.length},
    images: [${imageSrcPaths.map(p => `"${p}"`).join(", ")}],
    palette: [],
    featured: ${featured},
    published: true,
    showYear: true,
    highlight: true,
  },`;

  // Insert at top of artworks array in artworks.ts
  const tsContent = fs.readFileSync(ARTWORKS_TS, "utf-8");
  const insertMarker = "export const artworks: Artwork[] = [";
  const markerIdx = tsContent.indexOf(insertMarker);
  if (markerIdx === -1) {
    console.log("  ✗ Could not find artworks array in artworks.ts. Please add manually.");
    process.exit(1);
  }
  const insertAt = markerIdx + insertMarker.length;
  const updated = tsContent.slice(0, insertAt) + "\n" + entry + "\n" + tsContent.slice(insertAt);
  fs.writeFileSync(ARTWORKS_TS, updated, "utf-8");
  console.log("  ✓ Added to artworks.ts");

  // Git push
  console.log("\n  Pushing to GitHub (Vercel will auto-deploy in ~30s)...");
  try {
    execSync(`git -C "${__dirname}" add .`, { stdio: "pipe" });
    execSync(`git -C "${__dirname}" commit -m "✦ Add artwork: ${title}"`, { stdio: "pipe" });
    execSync(`git -C "${__dirname}" push`, { stdio: "inherit" });
    console.log("\n✦ ────────────────────────────────────────────────");
    console.log(`  ✓ Done! "${title}" is live on your site in ~30 seconds.`);
    console.log("  Check: https://your-site.vercel.app/universe");
    console.log("✦ ────────────────────────────────────────────────\n");
  } catch (e) {
    console.log("\n  ⚠ Git push failed. Changes saved locally.");
    console.log("  Run manually: git add . && git commit -m 'Add artwork' && git push\n");
  }
}

main().catch(console.error);
