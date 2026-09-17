# BudsNiche Prototype v0.1

This is a no-Terminal prototype of BudsNiche. You can upload it directly to GitHub and deploy it with Vercel.

## Included
- Daily check-in homepage
- Current date
- Demo weather card
- Daily Bible verse
- Daily motivation
- Makai's Hot Take poll
- News placeholders
- Browser-based check-in streak
- 3-round BudsNiche game demo
- 45-second timer
- 4 answers per round
- Prototype niche scoring
- "You missed..." reveal

## Important
This is only the first prototype. Weather and news are not live, poll totals are local/demo only, and scoring uses a small hand-made list. The real version will later use Supabase + the BudsNiche AI Judge.

## Put it online without Terminal
1. Create/sign into GitHub.
2. Make a new repository named `budsniche`.
3. Click **Add file → Upload files** and upload everything from this ZIP.
4. Create/sign into Vercel using GitHub.
5. Click **Add New → Project** and import the `budsniche` repository.
6. Deploy it. Vercel will give you a temporary URL.
7. After Cloudflare verifies `budsniche.com`, open **Vercel → your project → Settings → Domains** and add `budsniche.com`.
8. Vercel will tell you which DNS record(s) to add in Cloudflare. Use exactly what Vercel shows you.

## Next steps
- Supabase database
- Private admin dashboard
- Daily topic publishing
- BudsNiche AI Judge trained on Makai's scoring style
- Live poll totals
- Live weather
- Verified news feed
- Email/SMS morning reminders
- Accounts, streaks, stats, leaderboards
