import { Suspense } from "react";
import { SignUpForm } from "@/app/signup/signup-form";

export const metadata = {
  title: "Crear cuenta — JB Software",
  description: "Crea una cuenta de JB Software.",
  alternates: {
    canonical: "/es/signup",
    languages: { en: "/signup", es: "/es/signup" },
  },
  openGraph: {
    title: "Crear cuenta — JB Software",
    description: "Crea una cuenta de JB Software.",
    url: "/es/signup",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crear cuenta — JB Software",
    description: "Crea una cuenta de JB Software.",
    images: ["/og.png"],
  },
};

export default function SignUpPageEs() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  return (
    <Suspense>
      <SignUpForm googleEnabled={googleEnabled} lang="es" />
    </Suspense>
  );
}
