import { Suspense } from "react";
import { SignInForm } from "./signin-form";

export const metadata = {
  title: "Sign in — JB Software",
  description: "Sign in to your JB Software account.",
};

export default function SignInPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  return (
    <Suspense>
      <SignInForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
