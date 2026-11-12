import type { Metadata } from "next";
import { LoginScreen } from "@/components/login/login-screen";

export const metadata: Metadata = { title: "Sign in | Learning Buddy" };

export default function LoginPage() {
  return <LoginScreen />;
}
