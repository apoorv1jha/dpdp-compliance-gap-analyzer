# DPDP Gap Analysis

A compliance gap-analysis tool for India's **Digital Personal Data Protection Act, 2023**.
Two ways in, one report out:

1. **Questionnaire** — 20 questions across the Act's 10 core obligations (notice, consent,
   children's data, security, breach notification, retention, Data Principal rights,
   cross-border transfer, Significant Data Fiduciary duties, purpose limitation), scored
   into a clause-by-clause risk report.
2. **Document scan** — paste or upload an existing privacy policy / consent notice and get
   findings with fixes. Two modes, both free:
   - **Keyword scanner** (default, no key, fully offline): checks the policy for the elements
     the Act expects.
   - **AI review** (optional): add a free Groq key and Llama 3.3 70B reviews the text in more
     depth. If Groq is rate-limited, it falls back to the keyword scanner automatically.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind. No paid services needed.

## Setup

```bash
npm install
cp .env.example .env.local
# optional: add a free GROQ_API_KEY (https://console.groq.com/keys, no card needed)
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  page.tsx                     Landing page, obligation overview
  questionnaire/page.tsx       20-question guided flow (client-side scoring)
  analyze/page.tsx             Upload/paste a policy document
  report/page.tsx              Combined report (reads localStorage, renders both)
  api/analyze-document/route.ts   Server route: Groq (free) with keyword-scanner fallback
lib/
  dpdp-sections.ts             Question bank mapped to Act sections
  scoring.ts                   Scoring + risk-level logic
  heuristic-scan.ts            Offline keyword scanner for policy text
  types.ts                     Shared TypeScript types
components/
  QuestionCard.tsx, ProgressBar.tsx, RiskBadge.tsx, ReportSection.tsx
```

## How the scoring works

Each question's answer options carry a 0–3 score. Points are summed per obligation and
converted to a percentage, which maps to a risk band:

| Percentage | Risk band   |
|-----------:|-------------|
| 90–100%    | Compliant   |
| 65–89%     | Low risk    |
| 40–64%     | Medium risk |
| 0–39%      | High risk   |

Answers are stored in `localStorage` only — nothing is persisted server-side, and the
document scan route does not log or store the document text beyond the single API call.

## Extending this project

Ideas if you want to take this further for a portfolio writeup or an actual product:
- Persist reports to a database (e.g. Postgres/MongoDB) with auth, so users can track
  compliance posture over time instead of a single point-in-time report.
- Add a PDF export of the report (the `pdf` generation approach used elsewhere in your
  projects would fit well here) instead of relying on browser print.
- Expand the document scanner to accept PDF/DOCX uploads directly (parse server-side
  before sending text to the model).
- Add a scoring weight system so Significant Data Fiduciary questions only appear/count
  if the user says the product is at that scale.

## Disclaimer

This tool produces a directional, automated assessment for engineering/product teams.
It is **not legal advice** and does not replace review by qualified privacy counsel.
