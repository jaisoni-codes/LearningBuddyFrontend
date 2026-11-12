import type { Metadata } from "next";
import { SignupScreen } from "@/components/signup/signup-screen";

export const metadata: Metadata = { title: "Sign up | Learning Buddy" };

export default function SignupPage() {
  return <SignupScreen />;
}
