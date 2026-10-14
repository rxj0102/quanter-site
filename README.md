# Quanter site

The Quanter website, built with Next.js. It reads `results.json` from the Quanter pipeline repo and shows live risk numbers, charts and the segment table. If the file is missing or unreachable, the page falls back to labeled placeholders instead of breaking.

## Run it

```
npm install
cp .env.example .env.local     # then set RESULTS_URL
npm run dev
npm run typecheck
npm run build
```

`RESULTS_URL` is the raw GitHub URL of the pipeline output, for example `https://raw.githubusercontent.com/rxj0102/quanter-pipeline/main/site_data/results.json`. The page refreshes it at most once an hour.

## Edit your content

Everything you write by hand is in `content/site.ts`: the three studies, the lab list, tools, process steps, bio and contact details. Any text that starts with `[` is shown in the amber placeholder style, so you can see at a glance what still needs a real value. Replace the memo and code links with real repo URLs.

## What the page does with data

- Charts are plain SVG, no chart library. Each line is colored by segment: in-sample, out-of-sample, paper trading.
- A notice appears when no results are connected, when the data is flagged synthetic, and when paper trading has run for fewer than 60 trading days.
- The track record section shows the per-segment statistics straight from the pipeline, so nothing is typed in by hand.

## Deploy

Push to GitHub, import the repo in Vercel, add `RESULTS_URL` as an environment variable, and deploy. Attach your own domain when you have one.

## Not done yet

- Memo pages are in place at /research/<slug>, generated from the studies list in `content/site.ts`. To add a study, add an entry there with a new slug. They hold structured placeholders for now, so write the real findings in before sharing the link.
- The drawdown stop and decay check now come from the pipeline (tiles in the signals section, plus notices when the stop is engaged or the decay check flags a review). Until results are connected they show as placeholders.
