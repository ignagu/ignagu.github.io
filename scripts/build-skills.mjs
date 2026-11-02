// Zips every src/content/projects/<slug>/skill/ folder into dist/downloads/skills/<slug>.zip.
// Skill sources stay as readable text in the repo, so the privacy scan can check them.
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { zipSync } from 'fflate';

const root = 'src/content/projects';
const out = 'dist/downloads/skills';
mkdirSync(out, { recursive: true });

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f.startsWith('.')) return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// Fixed timestamp so zips are reproducible and carry no local time information.
const mtime = new Date('2020-01-01T00:00:00Z');
let count = 0;
for (const slug of readdirSync(root)) {
  const skillDir = join(root, slug, 'skill');
  if (!existsSync(skillDir)) continue;
  const files = {};
  for (const f of walk(skillDir)) files[`${slug}/${relative(skillDir, f)}`] = [readFileSync(f), { mtime }];
  writeFileSync(join(out, `${slug}.zip`), zipSync(files, { level: 9 }));
  count++;
}
console.log(`[skills] built ${count} skill zip(s) in ${out}`);
