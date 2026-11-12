import type { ReactNode } from "react";
import { LogoMark, Wordmark } from "@/components/brand/logo-mark";

/** Split layout shared by sign in and sign up: form on the left, dark brand panel on the right. */
export function AuthShell({ headingId, children }: { headingId: string; children: ReactNode }) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section aria-labelledby={headingId} className="flex items-center px-4 py-10 sm:px-8 lg:py-16">
        <div className="mx-auto w-full max-w-[25rem]">
          <Wordmark />
          <div className="mt-14">{children}</div>
        </div>
      </section>
      <BrandPanel />
    </main>
  );
}

function BrandPanel() {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative flex flex-col overflow-hidden rounded-t-[2rem] bg-night px-6 pt-10 pb-12 text-night-text sm:px-10 lg:rounded-t-none lg:rounded-tl-[2.5rem] lg:px-16 lg:pt-16 lg:pb-20"
    >
      <PanelStreaks />

      <LogoMark className="relative h-24 w-auto self-start sm:h-32 lg:h-48" />

      <div className="relative mt-10 max-w-[32rem] lg:mt-auto">
        <p className="text-night-muted">Your semester planner</p>
        <h2 id="welcome-heading" className="mt-1 text-[1.75rem] font-extrabold leading-tight tracking-tight lg:text-[2rem]">
          Welcome to Learning Buddy
        </h2>
        <p className="mt-3 text-night-muted">
          Tell us your branch and what you&apos;re aiming for. We map it to your institute&apos;s curriculum, show what
          you&apos;re missing, and build a semester plan you can actually follow.
        </p>
        <p className="mt-3 text-night-text">Built from the institute&apos;s own course structure, not a generic list.</p>
      </div>
    </section>
  );
}

/** Thin diagonal light streaks in the panel's top-right corner. Decorative. */
function PanelStreaks() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute top-0 right-0 h-[26rem] w-[26rem] max-w-full"
      viewBox="0 0 400 400"
      fill="none"
    >
      <defs>
        <linearGradient id="streak" x1="400" y1="0" x2="120" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff8a80" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff8a80" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M400 40 160 300" stroke="url(#streak)" strokeWidth="10" strokeLinecap="round" />
      <path d="M400 92 214 296" stroke="url(#streak)" strokeWidth="3" strokeLinecap="round" />
      <path d="M372 0 250 132" stroke="url(#streak)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="318" cy="46" r="1.5" fill="#f4f4f4" opacity="0.5" />
      <circle cx="356" cy="160" r="1" fill="#f4f4f4" opacity="0.4" />
      <circle cx="230" cy="28" r="1" fill="#f4f4f4" opacity="0.35" />
    </svg>
  );
}

/** Shown after a successful sign in / sign up while onboarding does not exist yet. */
export function AuthDone({
  headingId,
  title,
  message,
  onBack,
  backLabel,
}: {
  headingId: string;
  title: string;
  message: string;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <div role="status">
      <h1 id={headingId} className="text-[2rem] font-extrabold leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-graphite">{message}</p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 font-bold text-accent underline underline-offset-4 hover:text-accent-strong"
      >
        {backLabel}
      </button>
    </div>
  );
}
