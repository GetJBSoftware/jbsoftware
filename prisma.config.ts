import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js loads `.env.local`; the Prisma CLI only loads `.env` by default.
// This keeps local commands (migrate, seed, studio) in sync with Next.
loadEnv({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
    directUrl: env("DIRECT_URL"),
  },
});
