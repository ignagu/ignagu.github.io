# ignagu.github.io

A small collection of AI projects built with Claude, each packaged so anyone can reuse it. Built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions on every push to `main`.

Live: https://ignagu.github.io

## Privacy checklist (read before every commit)

The site is about the projects, not about me. It must never contain personal contact or identity details. Before you commit, check:

- [ ] No email address, phone number, home address or city of residence, nationality, or birth date.
- [ ] No photos of family. No children's names anywhere, including inside skill files and screenshots.
- [ ] Screenshots are cropped and checked: no names, addresses, emails, notifications or browser tabs showing personal data.
- [ ] Images carry no metadata (the scan flags EXIF and GPS). Screenshots taken on a computer are usually clean. Phone photos are not.
- [ ] The only contact routes are LinkedIn (`src/data/site.json`) and the Tally forms.
- [ ] No PDF or zip is committed. Skill zips are generated at build time.
- [ ] Git uses your noreply address: `git config user.email` should print `54140338+ignagu@users.noreply.github.com`.
- [ ] `npm run check` passes (build plus privacy scan of the repo, the git history and the built site).

The scan also runs automatically:

- **before every push**, via the git hook in `.githooks/pre-push` (enabled by `npm install`), and
- **in GitHub Actions** before deploying. If it finds something, nothing is published.

**Private blocklist.** To make the scan look for words that must never appear (your children's names, your street, your town), put one per line in `private/blocklist.txt`. The `private/` folder is ignored by git, so the list itself never leaves your computer. To apply the same list in GitHub Actions, add it as a repository secret named `PRIVACY_BLOCKLIST` (Settings, Secrets and variables, Actions, New repository secret).

## Add a project

**Two rules for every project:**

- **Generic names.** The title says plainly what it is ("Personal Daily Newspaper", "Nightly Bedtime Story"), never a nickname I gave it. People will name their own copy. The folder name and the skill `name` use the same generic words (`daily-newspaper`).
- **Anything recurring must be truly hands-off.** If a project is meant to run on a schedule (daily, weekly or monthly), its `SKILL.md` must (1) end the first run by offering to create the scheduled task, (2) put every preference inside the scheduled task's prompt, and (3) have scheduled runs that never ask questions or wait for approval. The project page sets `frequency:` and `schedule:`, and the third step is "Make it daily" (or weekly, monthly). Copy `daily-newspaper/skill/SKILL.md` (daily) or `bills-and-subscriptions/skill/SKILL.md` (monthly) as the template.
- **Generic tools.** Never tie a project to one provider. Say "your email (any service with a Claude connector)", not a brand name, and tell the skill to use whichever connector is available.

1. Copy an existing folder in `src/content/projects/`, for example `daily-newspaper/`, and rename it with a generic name (the folder name becomes the URL: `/projects/<folder>/`).
2. Edit `index.md`:
   - `title`, `summary`, `date` (YYYY-MM-DD; shown as DD/MM/YYYY).
   - `status: live` once it is finished (or `placeholder` while it is in progress).
   - `screenshots`: images placed in the `screenshots/` folder, each with a short `alt` text describing it.
   - `steps`: at most three steps for AI beginners. Uploading a skill: *Customize*, *Skills*, *+*, *Upload a skill*, then switch it on.
   - `frequency` (`daily`, `weekly` or `monthly`) and `schedule` (when it arrives, e.g. `Every morning, at the time you choose`) for scheduled projects. These show the frequency tag and the "Hands-off" note.
   - `tallyId`: the ID of the Tally form (see below). Leave empty to show a "coming soon" note.
   - The Markdown body is the "What it does" section.
3. Put the Claude Skill files in the `skill/` folder (at least a `SKILL.md` whose `name` matches the folder name, with a `description` under 200 characters). The downloadable `.zip` is built automatically. Do not commit zips.
4. Check the screenshots and every skill file against the privacy checklist, then commit and push.

Add `draft: true` to the front matter to keep a project off the live site.

Folder layout:

```
src/content/projects/my-project/
├── index.md
├── cover.svg        (preview image, 16:9)
├── screenshots/
│   └── 01-main.png
└── skill/
    └── SKILL.md
```

## Feedback forms (Tally)

1. Create a free form at [tally.so](https://tally.so). Do not add fields that ask for email or names unless you really need them.
2. Publish it and open **Share**. The form ID is the short code at the end of the link, for example `https://tally.so/r/w7Xy2A` has the ID `w7Xy2A`.
3. Paste it as `tallyId: w7Xy2A` in the project's `index.md`. Visitors can answer without logging in.

## LinkedIn

Paste your profile URL in `src/data/site.json` under `"linkedin"`. While it is empty, the link is hidden.

## Run it locally (optional)

Requires Node 22.

```sh
npm install        # also enables the pre-push privacy hook
npm run dev        # http://localhost:4321
npm run check      # full build + privacy scan, the same as CI
```

To change the social preview image, edit the text in `scripts/make-og.mjs` and run `node scripts/make-og.mjs`.

## Translations (later)

The site is English first and ready for Spanish and French:

1. Add `'es'` (or `'fr'`) to `locales` in `astro.config.mjs` and to `languages` in `src/i18n/index.ts`.
2. Copy `src/i18n/en.json` to `es.json` and translate it.
3. Create `src/pages/es/index.astro` rendering `<HomeView lang="es" />`, plus a project page for Spanish entries.
4. Projects get `lang: es` in their front matter.

## Design notes

Contemporary editorial, light only (no dark mode). Warm white background, near-black ink and one vermilion accent (`#e2481c`). Headlines in Instrument Serif, with the italic used for emphasis; text and interface in Geist; small details in Geist Mono. All fonts are self hosted. Projects appear as cards with a preview image: put a `cover.svg` or `cover.png` (16:9) in the project folder and set `cover: ./cover.svg`. Dates are DD/MM/YYYY, units are metric, and copy uses no em dashes (the scan checks this).
