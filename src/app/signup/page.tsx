import { Suspense } from "react";
import { SignUpForm } from "./signup-form";

export const metadata = {
  title: "Create account — JB Software",
  description: "Create a JB Software account.",
};

export default function SignUpPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );

  return (
    <Suspense>
      <SignUpForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
