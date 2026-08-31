# RC Endurance Driver Hub

A GitHub-ready Next.js starter for an RC endurance championship driver pool.

## Features
- Sample championship with 3 rounds and 4 example drivers
- Round-specific unaffiliated driver filtering
- Experience filtering
- Team-manager shortlist demo
- Secure Google Sheets / Google Forms webhook endpoint
- Supabase schema for drivers, rounds, availability, teams and shortlists

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Deploy
Push this folder to a GitHub repository and import it into Vercel.

## Connect Supabase
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy the project URL and anon key into `.env.local`.
4. The current UI uses sample data so the app remains usable before live data is connected. The next production step is to swap `lib/sample.ts` calls for Supabase queries.

## Connect Google Forms / Sheets
Use a Google Form linked to a Google Sheet. Add an Apps Script installable `onFormSubmit` trigger that maps your column names to the webhook payload and POSTs to `/api/google-sheets` with the `x-webhook-secret` header.

Keep the webhook URL and secret in Apps Script properties rather than hard-coding them.

## Recommended production upgrades
- Supabase Auth with driver/team-manager/admin roles
- Row-level security policies for private contact details
- Contact-request workflow instead of exposing email
- Admin mapping screen for arbitrary Google Sheet column names
- Persistent shortlists
- Email notifications
