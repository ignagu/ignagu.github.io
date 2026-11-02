# ignagu.github.io

Personal site of Ignacio Gil Urrutia. Built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions on every push to `main`.

Live: https://ignagu.github.io

## Privacy checklist (read before every commit)

The site must never contain personal contact or identity details. Before you commit, check:

- [ ] No email address, phone number, home address or city of residence, nationality, or birth date.
- [ ] No photos of family. No children's names anywhere, including inside skill files and screenshots.
- [ ] Screenshots are cropped and checked: no names, addresses, emails, notifications or browser tabs showing personal data.
- [ ] Images carry no metadata (the scan flags EXIF and GPS). Screenshots taken on a computer are usually clean. Phone photos are not.
- [ ] The only contact routes are LinkedIn (`src/data/site.json`) and the Tally forms.
- [ ] No original CV, PDF or zip is committed. The CV PDF and skill zips are generated at build time.
- [ ] Git uses your noreply address: `git config user.email` should print `54140338+ignagu@users.noreply.github.com`.
- [ ] `npm run check` passes (build plus privacy scan of the repo, the git history, the built site and the PDF).

The scan also runs automatically:

- **before every push**, via the git hook in `.githooks/pre-push` (enabled by `npm install`), and
- **in GitHub Actions** before deploying. If it finds something, nothing is published.

**Private blocklist.** To make the scan look for words that must never appear (your children's names, your street, your town), put one per line in `private/blocklist.txt`. The `private/` folder is ignored by git, so the list itself never leaves your computer. To apply the same list in GitHub Actions, add it as a repository secret named `PRIVACY_BLOCKLIST` (Settings, Secrets and variables, Actions, New repository secret).

## Add a journal post

1. Create `src/content/journal/YYYY-MM-DD-short-title.md`:

   ```md
   ---
   title: What I learned this week
   summary: One sentence that appears in lists and in link previews.
   date: 2026-11-09
   ---

   Your text in Markdown.
   ```

2. Run the privacy checklist, then commit and push. The post appears at `/journal/short-title/`.

Add `draft: true` to the front matter to keep a post off the live site.

## Add a project

1. Copy an existing folder in `src/content/projects/`, for example `the-745/`, and rename it (the folder name becomes the URL: `/projects/<folder>/`).
2. Edit `index.md`:
   - `title`, `summary`, `date` (YYYY-MM-DD; shown as DD/MM/YYYY).
   - `status: live` once it is finished (or `placeholder` while it is in progress).
   - `screenshots`: images placed in the `screenshots/` folder, each with a short `alt` text describing it.
   - `steps`: at most three steps for AI beginners.
   - `tallyId`: the ID of the Tally form (see below). Leave empty to show a "coming soon" note.
   - The Markdown body is the "What it does" section.
3. Put the Claude Skill files in the `skill/` folder (at least a `SKILL.md`). The downloadable `.zip` is built automatically. Do not commit zips.
4. Check the screenshots and every skill file against the privacy checklist, then commit and push.

Folder layout:

```
src/content/projects/my-project/
├── index.md
├── screenshots/
│   └── 01-main.png
└── skill/
    └── SKILL.md
```

## Feedback forms (Tally)

1. Create a free form at [tally.so](https://tally.so). Do not add fields that ask for email or names unless you really need them.
2. Publish it and open **Share**. The form ID is the short code at the end of the link, for example `https://tally.so/r/w7Xy2A` has the ID `w7Xy2A`.
3. Paste it as `tallyId: w7Xy2A` in the project's `index.md`. Visitors can answer without logging in.

## Edit the CV

Everything is in `src/data/cv.en.json`. The web page (`/cv/`) and the PDF (`/downloads/cv-ignacio-gil-urrutia.pdf`) are both generated from that file, so they always match. The PDF has no contact details by design.

## LinkedIn

Paste your profile URL in `src/data/site.json` under `"linkedin"`. While it is empty, LinkedIn links are hidden.

## Run it locally (optional)

Requires Node 22.

```sh
npm install        # also enables the pre-push privacy hook
npm run dev        # http://localhost:4321
npm run check      # full build + privacy scan, the same as CI
```

## Translations (later)

The site is English first and ready for Spanish and French:

1. Add `'es'` (or `'fr'`) to `locales` in `astro.config.mjs` and to `languages` in `src/i18n/index.ts`.
2. Copy `src/i18n/en.json` to `es.json` and `src/data/cv.en.json` to `cv.es.json`, then translate.
3. Create `src/pages/es/` with thin pages that render the same views with `lang="es"`, for example `<HomeView lang="es" />`.
4. Posts and projects get `lang: es` in their front matter.

## Design notes

Direction A, "Drawing Sheet": every page is a drawing sheet with a frame, zone marks and a title block. Key numbers are drawn as dimension lines, projects form a drawing register (B-series) and journal posts a revision log (C-series). Typefaces are IBM Plex Sans, Sans Condensed and Mono, self hosted. One accent colour, drafting blue. Dates are DD/MM/YYYY, units are metric, and copy uses no em dashes (the scan checks this).
