#!/usr/bin/env node
// Regenerates downloads/files.json from the contents of downloads/.
// Zero dependencies. Run from anywhere:  node scripts/build-downloads.mjs
//
// Used two ways:
//   1. As the Cloudflare Pages build command, so every deploy lists exactly
//      what is in the folder.
//   2. From the pre-commit hook in .githooks/, so the committed files.json
//      is never stale even without a build step.

import { readdir, stat, writeFile, readFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir  = join(root, 'downloads');
const out  = join(dir, 'files.json');

// Files that live in downloads/ but are not downloads.
const EXCLUDE = new Set(['index.html', 'files.json', '.gitkeep', '.DS_Store', 'Thumbs.db']);

const entries = await readdir(dir, { withFileTypes: true });
const files = [];
for (const e of entries) {
  if (!e.isFile() || EXCLUDE.has(e.name) || e.name.startsWith('.')) continue;
  const s = await stat(join(dir, e.name));
  files.push({ name: e.name, size: s.size, modified: s.mtime.toISOString() });
}
files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true }));

// Keep the previous "generated" stamp if the file list itself hasn't changed,
// so a no-op run doesn't create a diff.
let prev = null;
try { prev = JSON.parse(await readFile(out, 'utf8')); } catch {}
const same = prev && JSON.stringify(prev.files) === JSON.stringify(files);
const generated = same ? prev.generated : new Date().toISOString();

const json = JSON.stringify({ generated, files }, null, 2) + '\n';
if (!same || !prev) {
  await writeFile(out, json);
  console.log(`downloads/files.json: ${files.length} file(s) listed`);
} else {
  console.log(`downloads/files.json: unchanged (${files.length} file(s))`);
}
