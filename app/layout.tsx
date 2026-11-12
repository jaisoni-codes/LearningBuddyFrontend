import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Atkinson Hyperlegible Next (OFL-1.1), bundled in app/fonts. No runtime font CDN.
const atkinson = localFont({
  src: [
    { path: "./fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/atkinson-hyperlegible-next-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Learning Buddy",
  description: "Course and skill planning for students.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
