-- Add email/password sign-in support (nullable: Google-only users keep working).
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;
