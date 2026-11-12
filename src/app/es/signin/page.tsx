import { Suspense } from "react";
import { SignInForm } from "@/app/signin/signin-form";

export const metadata = {
  title: "Iniciar sesión — JB Software",
  description: "Inicia sesión en tu cuenta de JB Software.",
  alternates: {
    canonical: "/es/signin",
    languages: { en: "/signin", es: "/es/signin" },
  },
  openGraph: {
    title: "Iniciar sesión — JB Software",
    description: "Inicia sesión en tu cuenta de JB Software.",
    url: "/es/signin",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iniciar sesión — JB Software",
    description: "Inicia sesión en tu cuenta de JB Software.",
    images: ["/og.png"],
  },
};

export default function SignInPageEs() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  return (
    <Suspense>
      <SignInForm googleEnabled={googleEnabled} lang="es" />
    </Suspense>
  );
}
