"use client";

import { useState } from "react";
import type { AuthResponse } from "@/lib/api";
import { saveSession } from "@/lib/session";
import { AuthDone, AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "./signup-form";

export function SignupScreen() {
  const [createdFor, setCreatedFor] = useState<string | null>(null);

  function onSignedUp(session: AuthResponse, name: string) {
    saveSession(session, true);
    // Onboarding is not built yet; confirm here instead of routing to a missing page.
    setCreatedFor(name);
  }

  return (
    <AuthShell headingId="signup-heading">
      {createdFor ? (
        <AuthDone
          headingId="signup-heading"
          title="Account created"
          message={`You're in, ${createdFor}. Next we'll ask about your branch, courses and goal. That part opens here once it's built.`}
          onBack={() => setCreatedFor(null)}
          backLabel="Back to sign up"
        />
      ) : (
        <>
          <h1 id="signup-heading" className="text-[2rem] font-extrabold leading-tight tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-graphite">Takes a minute. After this we&apos;ll set up your plan together.</p>
          <SignupForm onSignedUp={onSignedUp} />
        </>
      )}
    </AuthShell>
  );
}
