"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { authApi, ApiError, type AuthResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { LockIcon, MailIcon, UserIcon } from "@/components/ui/icons";

const MIN_PASSWORD = 8;

const schema = z
  .object({
    name: z.string().trim().min(1, "Enter your name."),
    email: z.string().trim().min(1, "Enter your email.").email("That doesn't look like an email address."),
    password: z.string().min(MIN_PASSWORD, `Use at least ${MIN_PASSWORD} characters.`),
    confirm: z.string().min(1, "Type your password again."),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords don't match." });
type Values = z.infer<typeof schema>;

export function SignupForm({ onSignedUp }: { onSignedUp: (s: AuthResponse, name: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<{ message: string; exists: boolean } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  async function onSubmit({ name, email, password }: Values) {
    setServerError(null);
    try {
      const session = await authApi.signup({ name: name.trim(), email: email.trim(), password });
      onSignedUp(session, name.trim());
    } catch (e) {
      setServerError(
        e instanceof ApiError
          ? { message: e.message, exists: e.status === 409 }
          : { message: "Couldn't create the account. Try again.", exists: false },
      );
    }
  }

  const toggle = (
    <Button
      type="button"
      variant="quiet"
      aria-pressed={showPassword}
      aria-label={showPassword ? "Hide passwords" : "Show passwords"}
      onClick={() => setShowPassword((v) => !v)}
    >
      {showPassword ? "Hide" : "Show"}
    </Button>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
      {serverError && (
        <div role="alert" className="rounded-field border border-danger/40 bg-danger-wash px-3.5 py-3 text-danger">
          {serverError.message}
          {serverError.exists && (
            <>
              {" "}
              <Link href="/login" className="font-bold underline underline-offset-4">
                Sign in instead
              </Link>
            </>
          )}
        </div>
      )}

      <TextField
        label="Full name"
        autoComplete="name"
        placeholder="As you'd like us to call you"
        icon={<UserIcon />}
        error={errors.name?.message}
        {...register("name")}
      />

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
        hint={`At least ${MIN_PASSWORD} characters.`}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        icon={<LockIcon />}
        error={errors.password?.message}
        trailing={toggle}
        {...register("password")}
      />

      <TextField
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        icon={<LockIcon />}
        error={errors.confirm?.message}
        {...register("confirm")}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-graphite">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-accent underline underline-offset-4 hover:text-accent-strong">
          Sign in
        </Link>
      </p>
    </form>
  );
}
