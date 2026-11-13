import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LangSync, SkipLink } from "@/components/lang-sync";
import { LanguageSuggestion } from "@/components/language-suggestion";
import { SITE, CONTACT_EMAIL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "JB Software — Coming soon",
  description:
    "JB Software builds fast, focused desktop tools for Windows. A free command bar, a local search engine and a workspace manager are in development.",
  applicationName: "JB Software",
  openGraph: {
    title: "JB Software",
    description:
      "Fast, focused desktop tools for Windows. Coming soon.",
    url: "/",
    siteName: "JB Software",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "JB Software — fast, focused desktop tools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Software",
    description:
      "Fast, focused desktop tools for Windows. Coming soon.",
    images: ["/og.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo-mark.png`,
  email: CONTACT_EMAIL,
  sameAs: [SITE.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangSync />
        <SkipLink />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <LanguageSuggestion />
          <Navbar />
          <main id="main" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
