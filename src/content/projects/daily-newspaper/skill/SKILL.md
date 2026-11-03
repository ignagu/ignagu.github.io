---
name: daily-newspaper
description: Writes a one page daily newspaper on the topics a person or family cares about, and sets it up to arrive automatically every day. Use for a daily newspaper, morning briefing or news digest.
---

# Daily Newspaper

A one page newspaper, written fresh every day, on the topics the reader chose. It is meant to run on a schedule so it arrives every morning with no effort.

This skill runs in one of two modes. Work out which one applies before doing anything else.

- **Scheduled run**: the request says it is a scheduled run, or it was started by a scheduled task. Nobody is watching. Follow "Scheduled run" below.
- **Setup run**: anything else, for example a person asking for their newspaper in a chat. Follow "Setup run" below.

## Setup run (a person is present)

Goal: make the first edition, then make sure it arrives every day on its own. Do not finish a setup run without offering the schedule.

1. **Ask for preferences in one short message.** Ask everything at once, with defaults, so the person can answer in one reply:
   - Who it is for: just them, or the whole family (if family, any ages to keep in mind for tone).
   - Three to five topics or sections (default: world, science, technology, one good news story).
   - Where in the world, only if they want local news (a country or region is enough, never ask for an address).
   - Language (default: the language they are writing in).
   - What time it should arrive each day (default: 07:00 in their local time).
2. **Make today's edition** using the "Edition format" below, so they can see what they will get.
3. **Set up the daily schedule.** Ask: "Do you want this every day at [time]? I can schedule it so it arrives on its own, even when your computer is off." If they say yes:
   - Create a scheduled task, frequency **daily**, at the time they chose.
   - Name it "Daily Newspaper".
   - Use the "Scheduled task prompt" below as the task's instructions, with their answers filled in. Everything the daily run needs must be inside that prompt, because the daily run cannot ask questions.
   - Show them the name, time and instructions, and ask them to confirm with the **Schedule** button.
4. **Confirm and explain where to find it.** Tell them: each new edition appears under **Scheduled** in the left sidebar of Claude, and they can pause, change or delete it there at any time.

If scheduling is not available (it needs a paid Claude plan), say so plainly and give them the scheduled task prompt to paste into **Scheduled**, **New task**, **Set up manually** later.

### Scheduled task prompt

Fill in the brackets and use this as the scheduled task's instructions:

```
Use the daily-newspaper skill. This is a scheduled run: nobody is watching, so do not ask any questions and do not wait for approval.
Reader: [just me | my family, ages ...]
Sections: [topic 1], [topic 2], [topic 3]
Local news for: [country or region, or "none"]
Language: [language]
Write today's edition now.
```

## Scheduled run (nobody is present)

- Never ask questions and never stop to wait for confirmation. If something is missing, use the defaults above.
- Use web search to find news from the last 24 hours. If a source or a topic gives nothing useful, skip it and carry on.
- Always finish with a complete edition, even if it is shorter than usual.

## Edition format

1. Masthead: "Daily Newspaper" (or a name the reader chose) and today's date as DD/MM/YYYY.
2. Lead story: a headline and about 150 words.
3. Three to five briefs, one per section: a headline and two sentences each.
4. "One more thing": something light or thoughtful to end on.
5. Sources: one short line per item, with a link.

## Rules

- Fits on one A4 page or one phone screen of scrolling. Be concise and neutral.
- Use metric units and DD/MM/YYYY dates.
- For a family edition, keep every item suitable for the youngest reader.
- Never include personal details about the reader, such as names, addresses or emails, in the edition.
