# JB Software

Next.js (App Router) + Tailwind + Auth.js (Google) + Stripe + Prisma/PostgreSQL.
Tesla-inspired marketing site for getjbsoftware.com.

## Features

- Hero/intro landing page
- `/downloads` — free and paid software, GitHub release links
- `/investments` — one-time contributions via Stripe
- Google sign-in / sign-up
- Paid software is a one-time purchase; download anywhere after login
- `/account` — purchases and investments
- Stripe webhook unlocks paid downloads

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create `.env.local` (see `.env.example`) and fill in:

   - `DATABASE_URL` — PostgreSQL (Neon/Supabase/Vercel Postgres)
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

3. Database

   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```

4. Run

   ```bash
   npm run dev
   ```

## Google OAuth

Create OAuth credentials in Google Cloud Console and add
`http://localhost:3000/api/auth/callback/google` (and your production URL) as
authorized redirect URIs.

## Stripe

- Create a webhook endpoint pointing to `https://your-domain.com/api/webhooks/stripe`
  listening to `checkout.session.completed`.
- For local testing use the Stripe CLI:

  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

## GitHub releases

Update `src/lib/products.ts` (`downloadUrl`, `githubRelease`) with your actual
GitHub release asset URLs. The download API gates paid products behind a
completed purchase.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example`.
4. Run `npx prisma migrate deploy` against your production database.
5. Set the Stripe webhook to your production domain.
