"use client";

import { useState } from "react";
import type { AuthResponse } from "@/lib/api";
import { saveSession } from "@/lib/session";
import { AuthDone, AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  const [signedInAs, setSignedInAs] = useState<string | null>(null);

  function onSignedIn(session: AuthResponse, email: string, remember: boolean) {
    saveSession(session, remember);
    // Onboarding is not built yet; confirm here instead of routing to a missing page.
    setSignedInAs(email);
  }

  return (
    <AuthShell headingId="signin-heading">
      {signedInAs ? (
        <AuthDone
          headingId="signin-heading"
          title="You're signed in"
          message={`Signed in as ${signedInAs}. Onboarding opens here once it's built.`}
          onBack={() => setSignedInAs(null)}
          backLabel="Back to sign in"
        />
      ) : (
        <>
          <h1 id="signin-heading" className="text-[2rem] font-extrabold leading-tight tracking-tight">
            Sign in
          </h1>
          <p className="mt-2 text-graphite">Your plan, courses and progress are where you left them.</p>
          <LoginForm onSignedIn={onSignedIn} />
        </>
      )}
    </AuthShell>
  );
}
