-- Purchases are now provider-agnostic. Lemon Squeezy is the merchant of record.
ALTER TABLE "Purchase" RENAME COLUMN "stripeSessionId" TO "providerOrderId";
ALTER TABLE "Purchase" ADD COLUMN "provider" TEXT NOT NULL DEFAULT 'lemonsqueezy';
ALTER INDEX "Purchase_stripeSessionId_key" RENAME TO "Purchase_providerOrderId_key";

-- Contributions were removed from the product before launch.
DROP TABLE "Investment";
