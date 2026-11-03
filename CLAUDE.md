# Working on this repo

A static Astro site of reusable AI projects, deployed to GitHub Pages by `.github/workflows/deploy.yml`. Read `README.md` for how projects are structured.

## Rules

- **Privacy first.** The site is about the projects, not the owner. Never add personal contact or identity details (email, phone, address, city of residence, nationality, birth date, family photos, children's names), including in skill files, screenshots, metadata or commit messages. Contact is only via the LinkedIn link in `src/data/site.json` and Tally forms. Commit as `54140338+ignagu@users.noreply.github.com`. Run `node scripts/privacy-scan.mjs` before every push and stop if it finds anything.
- **Generic project names.** Titles say plainly what the thing is ("Personal Daily Newspaper"), never the owner's nickname for it. Folder name and skill `name` follow the same generic wording.
- **Daily projects are hands-off.** A skill meant to run every day must offer to create a daily scheduled task at the end of its first run, put all preferences in the scheduled task prompt, and never ask questions during scheduled runs. Set `schedule:` in the project's front matter. Use `src/content/projects/daily-newspaper/skill/SKILL.md` as the template.
- **Beginner guides** have at most three steps.
- **Copy style.** English (UK spelling), DD/MM/YYYY dates, metric units, no em dashes. Contemporary editorial design, light only (never add dark mode): Instrument Serif headlines, Geist text, one vermilion accent. No drawing or blueprint theme, no purple gradients, no emoji icon grids.
