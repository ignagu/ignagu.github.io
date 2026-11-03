---
name: bills-and-subscriptions
description: Finds every recurring bill and subscription in the user's email, tracks them on a live dashboard and sends a monthly report. Use for tracking bills, subscriptions, renewals or recurring costs.
---

# Bills and Subscriptions Tracker

Finds every recurring payment in the user's email (utilities, phone and internet, insurance, rent or leases, streaming, software, apps, memberships, anything that repeats), keeps a running history, shows it on a live dashboard and emails a monthly report. It is meant to run on a schedule, so once it is set up the user does nothing.

This skill runs in one of two modes. Work out which one applies before doing anything else.

- **Scheduled run**: the request says it is a scheduled run, or it was started by a scheduled task. Nobody is watching. Follow "Scheduled run" below.
- **Setup run**: anything else, for example a person asking to set up their tracker in a chat. Follow "Setup run" below.

## What it needs

- **An email connector** with permission to search and read emails, and ideally to organise them (labels or folders) and send. Any email service works if it is connected to Claude. Use whichever email connector is available; never assume a specific provider. If none is connected, stop and ask the user to connect their email in Claude's connector settings, then try again.
- **A live dashboard**: an interactive artifact that keeps its own data, so later runs can update it.
- **Scheduled tasks** for the monthly run (needs a paid Claude plan).

If something is missing, say so plainly, explain what still works without it, and carry on with the rest.

## Setup run (a person is present)

Goal: a complete history, a dashboard, and a monthly schedule. Do not finish a setup run without offering the schedule.

### 1. Scan the inbox
Search the last 12 to 24 months for recurring payment emails: words like invoice, bill, receipt, payment, renewal, subscription, "your plan", "amount due", "trial ends", in the user's language too. Group them by sender and keep the ones that repeat or look like a subscription. For one email per sender, check where the amount, dates and usage (kWh, m³, GB) appear: in the preview, in the body, or only in an attachment.

### 2. Ask four questions, in one message, each with a default
1. **Which payments to track** (list what you found, grouped by type: utilities, telecom, insurance, housing and transport, subscriptions and apps, other). Default: all of them.
2. **How the report arrives**: live dashboard, a monthly email, or both. Default: both.
3. **Organise the emails?** One label or folder per type (for example Bills/Utilities, Subscriptions/Streaming), applied to old and new emails, never archiving or deleting. Default: yes.
4. **Extras**: price per unit and usage for utilities, year-on-year comparison, alerts for price rises and unusual bills, upcoming renewals and trials ending, a 12-month cost forecast. Default: all.

Also confirm the currency, date format and units from what the emails show.

### 3. Build the history
Read every matching email and put one row per charge into a table: type, provider, charge date, billing period start and end (if any), amount, currency, billing cycle (monthly, every two months, quarterly, yearly, one-off), usage and unit (if any), renewal or trial end date (if any), email id.
- Skip promotions from the same sender and resends of a charge already recorded (same invoice number or same amount and date).
- **Never guess an amount.** If it is only in an attachment you cannot open, record the payment without an amount, mark it "amount not readable", and tell the user. Offer to add it as a fixed amount they give you.
- Show the user the table grouped by type, with a few rows checked against their emails, before going further.

### 4. Organise the emails (if they said yes)
Create the labels or folders one at a time (creating several at once can fail), then apply them to every matching email. Note each one's id or name for the scheduled task.

### 5. Build the dashboard
Light colours only, whatever the device theme. Readable on a phone. Colour-blind safe colours, one per type. Sections:
1. **Headline**: one sentence on what changed, the total per month now, and the known cost for the next 12 months split by type.
2. **Every recurring payment**: one card each with the latest amount, billing cycle, change vs the previous charge and vs a year ago, and a small trend line.
3. **Month by month**: stacked columns of cost per calendar month. Spread a bill that covers several months evenly over its days, and spread yearly subscriptions over 12 months. Leave out months that are not fully covered yet.
4. **Coming up**: renewals, trials ending and expected bills in the next 60 days, each with its expected date (last charge plus the usual gap) and amount.
5. **Price changes**: payments that went up or down 20% or more vs a year ago, and any subscription whose price rose.
6. **Utilities** (if any): price per unit over time, usage per day, and how much of a change comes from using more vs paying more per unit.
7. **All charges**: a searchable table.
8. **Not in the numbers yet**: payments without a readable amount, with what to do about each.

Before finishing, test the calculations against the real data and fix anything that does not match the emails.

### 6. Set up the monthly schedule
Ask: "Do you want this updated every month with a report by email? I can schedule it so it runs on its own, even when your computer is off." If they say yes:
- Create a scheduled task, frequency **monthly**, on a day and time they choose (default: the 5th at 08:00 local time).
- Name it "Bills and subscriptions".
- Use the "Scheduled task prompt" below as its instructions, with the details filled in. Everything the monthly run needs must be inside that prompt, because it cannot ask questions.
- Check it does not duplicate an existing task. Show them the name, schedule and instructions, and ask them to confirm with the **Schedule** button.
- Offer to run it once now so they see the first report.

Then tell them: each run appears under **Scheduled** in Claude's sidebar, and they can pause, change or delete it there at any time.

If scheduling is not available, say so plainly and give them the scheduled task prompt to paste into **Scheduled**, **New task**, **Set up manually** later.

### Scheduled task prompt

Fill in the brackets and use this as the scheduled task's instructions:

```
Use the bills-and-subscriptions skill. This is a scheduled run: nobody is watching, so do not ask any questions and do not wait for approval.
Dashboard: [dashboard link]
Payments tracked: [list of providers with type and billing cycle]
Labels or folders: [type → label or folder name or id, or "none"]
Report: [dashboard only | dashboard and email to me]
Currency and date format: [e.g. EUR, DD/MM/YYYY]
Update the tracker for this month now.
```

## Scheduled run (nobody is present)

- Never ask questions and never stop to wait for confirmation. If something is missing, use what the prompt and the dashboard's data say.
1. Read the dashboard's stored data and find the latest date recorded per provider.
2. Search the email for charges newer than that, from tracked providers and from **new senders that look like a recurring payment**. Skip emails already recorded, promotions and resends. Never guess an amount.
3. Add the new charges to the dashboard's data and apply the right label or folder.
4. Recalculate the changes, alerts, coming-up list and 12-month figures. Flag any payment that is late: more than about 40 days since the last one for monthly bills, 75 days for every two months, 100 days for quarterly.
5. If the report includes email, send it to the user with the subject "Bills and subscriptions · [Month YYYY]": a one-sentence takeaway, a chart of cost per month, a table of new charges, price changes and new subscriptions found, what is coming up next month, the totals, payments without a readable amount, and the dashboard link. If nothing new arrived, send a short note naming anything late or coming up.
6. Always finish. If one provider or email fails, skip it, mention it in the report and carry on.

## Rules

- Use metric units and the user's currency and date format.
- Never put account numbers, policy numbers, card numbers or addresses on the dashboard or in the report.
- Never cancel, pay, reply to or unsubscribe from anything. This skill only reads, organises and reports.
- Say plainly what could not be done and suggest a fix.
