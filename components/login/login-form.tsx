"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { authApi, ApiError, type AuthResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { LockIcon, MailIcon } from "@/components/ui/icons";

const schema = z.object({
  email: z.string().trim().min(1, "Enter your email.").email("That doesn't look like an email address."),
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean(),
});
type Values = z.infer<typeof schema>;

export function LoginForm({
  onSignedIn,
}: {
  onSignedIn: (s: AuthResponse, email: string, remember: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showResetNote, setShowResetNote] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: true },
  });

  async function onSubmit({ email, password, remember }: Values) {
    setServerError(null);
    try {
      const session = await authApi.login({ email, password });
      onSignedIn(session, email, remember);
    } catch (e) {
      setServerError(e instanceof ApiError ? e.message : "Sign-in failed. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
      {serverError && (
        <div role="alert" className="rounded-field border border-danger/40 bg-danger-wash px-3.5 py-3 text-danger">
          {serverError}
        </div>
      )}

      <TextField
        label="Email address"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.edu"
        icon={<MailIcon />}
        error={errors.email?.message}
        {...register("email")}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        icon={<LockIcon />}
        error={errors.password?.message}
        trailing={
          <Button
            type="button"
            variant="quiet"
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        }
        {...register("password")}
      />

      <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 font-bold">
        <input type="checkbox" className="size-[1.125rem] accent-accent" {...register("remember")} />
        Remember me on this device
      </label>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>

      <div className="space-y-1.5">
        <p className="text-graphite">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-accent underline underline-offset-4 hover:text-accent-strong">
            Sign up
          </Link>
        </p>
        <button
          type="button"
          aria-expanded={showResetNote}
          onClick={() => setShowResetNote((v) => !v)}
          className="font-bold text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
        >
          Forgot password?
        </button>
        {showResetNote && (
          <p className="text-[0.9375rem] text-graphite">
            Self-service reset isn&apos;t available yet. Ask the admin to reset it from the admin page.
          </p>
        )}
      </div>
    </form>
  );
}
