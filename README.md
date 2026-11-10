# JB Software

Next.js (App Router) + Tailwind + Auth.js (Google) + Stripe + Prisma/PostgreSQL.
Tesla-inspired marketing site for getjbsoftware.com.

## Features

- Hero/intro landing page with the JB Software logo
- `/downloads` — roadmap of upcoming free and paid tools (marked "coming soon")
- `/investments` — one-time contributions via Stripe
- Email/password sign-up and sign-in, plus optional Google sign-in
- Paid software is a one-time purchase; download anywhere after login
- `/account` — purchases and investments
- `/contact` — contact page with a Gmail compose form
- `/privacy` and `/terms` — legal pages
- Stripe webhook unlocks paid downloads

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create `.env.local` (see `.env.example`) and fill in:

   - `DATABASE_URL` / `DIRECT_URL` — PostgreSQL (Supabase pooler URLs)
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `NEXT_PUBLIC_APP_URL` — public site URL, used for Stripe redirects
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional; email/password
     sign-up works without them
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `CONTACT_EMAIL` — address shown on the contact page

3. Database

   ```bash
   npx prisma migrate dev --name init
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

## Stripe

- Create a webhook endpoint pointing to `https://your-domain.com/api/webhooks/stripe`
  listening to `checkout.session.completed`.
- For local testing use the Stripe CLI:

  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

## Products and roadmap

All products live in `src/lib/products.ts`. They currently use
`status: "coming-soon"`, so the UI shows "Coming soon" instead of download and
buy buttons. When a build is ready:

1. Add its `downloadUrl` (and optional `githubRelease`).
2. Set `status: "available"`.
3. Run `npm run seed` to sync the product row.

The download API gates paid products behind a completed purchase.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example` to Vercel (Production and
   Preview), including both `DATABASE_URL` (transaction pooler, 6543) and
   `DIRECT_URL` (session pooler, 5432). Copy both strings from the Supabase
   **Connect** dialog — the pooler username is `postgres.<project-ref>`.
   Also set `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL=https://getjbsoftware.com` and
   (if you want Google sign-in) `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
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
6. Set the Stripe webhook to your production domain.
