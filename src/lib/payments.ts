import type { Product } from "@/lib/products";

const API_URL = "https://api.lemonsqueezy.com/v1";

/**
 * Lemon Squeezy acts as merchant of record, so it handles sales tax and VAT for
 * one-time software sales. Checkout stays disabled until the keys and the
 * variant ID for a product are configured.
 */
export const isLemonSqueezyConfigured = Boolean(
  process.env.LEMONSQUEEZY_API_KEY && process.env.LEMONSQUEEZY_STORE_ID
);

const variantIds: Record<string, string | undefined> = {
  "jb-optimizer": process.env.LEMONSQUEEZY_VARIANT_JB_OPTIMIZER,
};

export function getCheckoutVariantId(slug: string) {
  return variantIds[slug];
}

export function isCheckoutConfigured(product: Product) {
  return (
    isLemonSqueezyConfigured &&
    product.type === "paid" &&
    Boolean(getCheckoutVariantId(product.slug))
  );
}

interface CreateCheckoutInput {
  product: Product;
  productId: string;
  userId: string;
  email?: string | null;
  baseUrl: string;
}

export async function createCheckout({
  product,
  productId,
  userId,
  email,
  baseUrl,
}: CreateCheckoutInput) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = getCheckoutVariantId(product.slug);

  if (!apiKey || !storeId || !variantId) {
    throw new Error("Lemon Squeezy is not configured for this product.");
  }

  const response = await fetch(`${API_URL}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: email ?? undefined,
            custom: {
              user_id: userId,
              product_id: productId,
              product_slug: product.slug,
            },
          },
          product_options: {
            redirect_url: `${baseUrl}/downloads?success=1`,
            receipt_button_text: "Go to downloads",
            receipt_link_url: `${baseUrl}/downloads`,
          },
          checkout_options: {
            dark: true,
            logo: true,
            desc: true,
            discount: true,
            media: false,
          },
          preview: false,
          test_mode: process.env.LEMONSQUEEZY_TEST_MODE === "true",
        },
        relationships: {
          store: {
            data: { type: "stores", id: String(storeId) },
          },
          variant: {
            data: { type: "variants", id: String(variantId) },
          },
        },
      },
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      payload?.errors?.[0]?.detail ?? "Lemon Squeezy checkout failed.";
    throw new Error(detail);
  }

  const url = payload?.data?.attributes?.url;
  if (!url) {
    throw new Error("Lemon Squeezy did not return a checkout URL.");
  }

  return String(url);
}
