"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

function SignInForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-zinc-400">
          Sign in with Google to download paid software and track your
          investments.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full bg-white text-black px-5 py-3 font-medium hover:bg-zinc-200 transition"
        >
          <LogIn size={18} />
          Continue with Google
        </button>
        <p className="mt-6 text-xs text-zinc-500 text-center">
          By signing in you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
