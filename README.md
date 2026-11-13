# JB Software

Next.js (App Router) + Tailwind + Auth.js + Lemon Squeezy + Prisma/PostgreSQL.
Marketing site for getjbsoftware.com.

## Features

- Hero/intro landing page (logo lives in the navbar and footer)
- Product preview for JB Launcher (concept UI, labelled as a preview)
- `/downloads` — JB Launcher (free), JB Search (free demo + optional paid
  licence) and JB Workplace (freemium), all marked "coming soon"
- `/roadmap` — public milestones and changelog
- `/community` — bug reports and feature requests through GitHub Issues
- Launch list — email capture stored in `WaitlistEntry`, with a planned 50%
  launch discount on the first paid licence
- Email/password sign-up and sign-in, plus optional Google sign-in
- Paid tools can be one-time or subscription purchases; download anywhere after
  login
- `/account` — purchases
- `/contact` — contact page with a mailto form
- `/privacy` and `/terms` — legal pages
- `robots.txt`, `sitemap.xml`, Open Graph image and a styled 404
- Lemon Squeezy webhook unlocks paid downloads

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create `.env.local` (see `.env.example`) and fill in:

   - `DATABASE_URL` / `DIRECT_URL` — PostgreSQL (Supabase pooler URLs)
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `NEXT_PUBLIC_APP_URL` — public site URL, used for checkout redirects
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional; email/password
     sign-up works without them
   - `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`,
     `LEMONSQUEEZY_VARIANT_JB_SEARCH`, `LEMONSQUEEZY_VARIANT_JB_WORKPLACE`,
     `LEMONSQUEEZY_WEBHOOK_SECRET`
   - `CONTACT_EMAIL` — address shown on the contact page

3. Database

   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

4. Run

   ```bash
   npm run dev
   ```

## Authentication

Email/password sign-up works out of the box. Passwords are hashed with scrypt
and stored in `User.passwordHash`. Sessions use Auth.js JWTs.

Google sign-in is optional. To enable it, create OAuth credentials in Google
Cloud Console and add `http://localhost:3000/api/auth/callback/google` (and
`https://getjbsoftware.com/api/auth/callback/google`) as authorized redirect
URIs, then set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. The Google button
is hidden automatically when those variables are missing.

## Payments (Lemon Squeezy)

Lemon Squeezy is the merchant of record, so it handles global sales tax and VAT
for software sales. To enable checkout:

1. Create a store and paid variants for JB Search and JB Workplace Pro.
2. Copy the store ID and the variant IDs into `LEMONSQUEEZY_STORE_ID`,
   `LEMONSQUEEZY_VARIANT_JB_SEARCH` and `LEMONSQUEEZY_VARIANT_JB_WORKPLACE`.
3. Create an API key and set `LEMONSQUEEZY_API_KEY`.
4. Create a webhook pointing to `https://your-domain.com/api/webhooks/lemonsqueezy`
   with the `order_created` and `order_refunded` events. Set the signing secret
   as `LEMONSQUEEZY_WEBHOOK_SECRET`.
5. Set `LEMONSQUEEZY_TEST_MODE=true` while testing, then remove it or set it to
   `false` for live sales.

Checkout stays disabled (HTTP 503) until the keys and the product variant are
configured. Products also stay marked `coming-soon` until a real build exists.

## Products and roadmap

All products live in `src/lib/products.ts`. They currently use
`status: "coming-soon"`, so the UI shows "Coming soon" instead of download and
buy buttons. Product types are `free`, `trial` (free demo + optional paid
licence), `freemium` (free app + Pro features) and `paid`. When a build is
ready:

1. Add its `downloadUrl` (and optional `githubRelease`).
2. Set `status: "available"`.
3. Run `npm run seed` to sync the product row.

The download API gates paid products behind a completed purchase.

## Community

Bug reports and feature requests use GitHub Issues. Issue forms live in
`.github/ISSUE_TEMPLATE/`. The `/community` page links to them, and a Discord is
planned for the first beta.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example` to Vercel (Production and
   Preview), including both `DATABASE_URL` (transaction pooler, 6543) and
   `DIRECT_URL` (session pooler, 5432). Copy both strings from the Supabase
   **Connect** dialog — the pooler username is `postgres.<project-ref>`.
   Also set `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL=https://getjbsoftware.com` and
   `CONTACT_EMAIL=contact@getjbsoftware.com`. Add the Lemon Squeezy variables
   when payments go live.
   If `NEXTAUTH_URL` is present, it must be the public production URL — or
   remove it and let Auth.js use the request host.
4. Apply migrations once against Supabase (from your machine or CI):

   ```bash
   npm run db:migrate
   ```

   This uses `DIRECT_URL`. Do not run migrations through the transaction
   pooler on port 6543.
5. Keep the Vercel Build Command as the default (`npm run build`). Migrations
   are intentionally not part of the build so a database hiccup cannot break
   deployments.
6. Point the Lemon Squeezy webhook at the production domain.
