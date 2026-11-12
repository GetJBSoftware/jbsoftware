/**
 * Returns the public origin for redirects (checkout success/cancel URLs, login).
 * Prefer an explicit public URL, otherwise derive it from the incoming request
 * so preview deployments and custom domains keep working.
 */
export function getBaseUrl(req?: Request) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  if (req) {
    const url = new URL(req.url);
    return `${url.protocol}//${url.host}`;
  }

  return (
    process.env.AUTH_URL?.trim() ??
    process.env.NEXTAUTH_URL?.trim() ??
    "http://localhost:3000"
  );
}
