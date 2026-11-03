---
name: bedtime-story
description: Writes a calm, age appropriate bedtime story to read aloud, and sets it up so a new story arrives automatically every evening. Use for a bedtime story or a story for a child.
---

# Bedtime Story

A new, calm story to read aloud every night. It is meant to run on a schedule so a fresh story is waiting every evening with no effort.

This skill runs in one of two modes. Work out which one applies before doing anything else.

- **Scheduled run**: the request says it is a scheduled run, or it was started by a scheduled task. Nobody is watching. Follow "Scheduled run" below.
- **Setup run**: anything else, for example a parent asking for a story in a chat. Follow "Setup run" below.

## Setup run (a person is present)

Goal: write the first story, then make sure a new one arrives every evening on its own. Do not finish a setup run without offering the schedule.

1. **Ask for preferences in one short message.** Ask everything at once, with defaults, so the parent can answer in one reply:
   - Age of the listener (default: 4 to 7).
   - Reading time: 3, 5 or 10 minutes (about 400, 700 or 1 300 words; default: 5).
   - Favourite things to feature: animals, places, objects (default: a mix).
   - Optional: a recurring hero, for example "a small fox called Pip". A nickname for the child is fine but never needed.
   - Language (default: the language they are writing in).
   - What time the story should be ready each day (default: 19:00 in their local time).
2. **Write tonight's story** using the "Story format" below.
3. **Set up the nightly schedule.** Ask: "Do you want a new story every evening at [time]? I can schedule it so it is ready on its own, even when your computer is off." If they say yes:
   - Create a scheduled task, frequency **daily**, at the time they chose.
   - Name it "Bedtime Story".
   - Use the "Scheduled task prompt" below as the task's instructions, with their answers filled in. Everything the nightly run needs must be inside that prompt, because the nightly run cannot ask questions.
   - Show them the name, time and instructions, and ask them to confirm with the **Schedule** button.
4. **Confirm and explain where to find it.** Tell them: each new story appears under **Scheduled** in the left sidebar of Claude, and they can pause, change or delete it there at any time.

If scheduling is not available (it needs a paid Claude plan), say so plainly and give them the scheduled task prompt to paste into **Scheduled**, **New task**, **Set up manually** later.

### Scheduled task prompt

Fill in the brackets and use this as the scheduled task's instructions:

```
Use the bedtime-story skill. This is a scheduled run: nobody is watching, so do not ask any questions and do not wait for approval.
Listener age: [age]
Reading time: [3 | 5 | 10] minutes
Favourite things: [...]
Recurring hero: [description, or "none"]
Language: [language]
Write tonight's story now.
```

## Scheduled run (nobody is present)

- Never ask questions and never stop to wait for confirmation. If something is missing, use the defaults above.
- Keep stories varied from night to night. Pick tonight's theme from the day of the week:
  Monday: the forest. Tuesday: the sea. Wednesday: the sky and stars. Thursday: a town at night. Friday: a journey. Saturday: a garden. Sunday: home.
- Always finish with a complete story.

## Story format

- A title on the first line.
- The story in short paragraphs.
- Nothing else: no notes, no questions, no options.

## Style

- Short sentences, concrete images, gentle repetition.
- One small problem, solved with kindness or curiosity.
- No villains, no peril, no screens.
- End slowly: the hero gets sleepy and the world goes quiet.
- Never include real names, schools, addresses or places that could identify a child.
