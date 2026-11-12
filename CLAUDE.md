# Frontend: student web app

Read the root `CLAUDE.md` first. Work only inside this folder.

## Status (2026-11-12)
- **Done: Login page** (`app/login`, `components/login/`). Split layout from a user-supplied reference: light sign-in
  side (email/password with icons, remember me, forgot-password note) + dark brand panel (`night` tokens) with the
  logo mark (`components/brand/`) and welcome text. Accent is red `#D32F2F` (hover `#B30101`), chosen by the user.
  **The "Try a demo student" block was removed at the user's request** (the mock `getDemoPersonas`/`demoLogin`
  API still exists if it comes back). Social login buttons from the reference were
  left out on purpose (PS rule: no Google/OAuth, no external calls). Zod validation, server-error
  state, and a demo-persona list with loading, error and empty states. Uses the mock auth API (`lib/api/`). Lint and
  type-check pass. No external requests (checked in the network tab). Screenshots are in `screenshots/`.
- Theme tokens live in `app/globals.css` (`@theme`). Font: Atkinson Hyperlegible Next (OFL), bundled in `app/fonts/`.
- shadcn is not installed yet. The small `components/ui/` set is hand-written in the same pattern.
- Mock test account and personas are in `lib/api/mock-data.ts`. The 3rd persona (EE → PM) is PLACEHOLDER.
- **Done: Sign-up page** (`app/signup`, `components/signup/`). Name, email, password (min 8) + confirm, shared
  Show toggle, zod validation, "email already exists" (409) error with a sign-in link, success state. Login and sign
  up share `components/auth/auth-shell.tsx` (split layout + brand panel). Mock signup returns 409 for the mock test
  account's email.
- Next: onboarding. After login the page currently shows a
  "You're signed in" state instead of redirecting.

## Current scope (phase 1)
**Login page + onboarding screens only.** No plan / learning / progress screens yet.
The backend does not exist yet, so all data comes from a **mock API layer** (`lib/api/`) with the same function
signatures as the real endpoints in `../docs/contracts/frontend_onboarding_api.md`. Switch with `NEXT_PUBLIC_USE_MOCK=1`.

## Stack
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (Radix). Use `output: "standalone"` for Docker.
- **Do not keep shadcn's default look.** Define our own theme tokens (colors, radius, fonts, spacing) in one place.
- Fonts self-hosted via `next/font/local` or `next/font` (bundled at build). **No runtime calls to any CDN or external
  service** (PS rule). No Google login. No analytics.
- Form state: react-hook-form + zod. Keep dependencies few.

## Design direction (avoid "AI slop")
Load the `frontend-design` skill before designing. In addition:
- No purple-blue gradients, glassmorphism, sparkle icons, emoji-as-icons, "Unlock your potential with AI" copy,
  identical rounded cards everywhere, or lorem ipsum.
- One neutral palette + **one** accent colour; 1–2 typefaces; a consistent spacing scale.
- Real content: real branch names from our institute, realistic course names, copy in a student's voice (like a helpful
  senior), not corporate. Mark any invented course code as PLACEHOLDER in mock data.
- Design every state: loading, error, empty. LLM calls can be slow or fail: show progress, and on failure offer a manual
  fallback (choose from the goal catalogue).
- Responsive (works at phone width), keyboard accessible, visible focus states.

## Screens
### Login
- Email + password (local auth; backend will issue JWT later). Sign-up link.
- **"Try a demo student"** section: 2–3 persona cards (e.g. "Mechanical, Year 2 → AI/ML engineer",
  "Chemical, Year 3 → not sure, something in core"). One click logs in as that persona. Evaluators have little time.

### Onboarding (target: under 5 minutes)
Progress indicator, Back on every step, autosave so the student can leave and resume, Skip on optional fields.
1. **Basics:** name, branch/programme (dropdown from API), current year and semester, CGPA (optional, with a one-line
   note on why we ask and that it is optional).
2. **Courses already done:** after branch + semester are known, show that branch's core courses up to the current
   semester **pre-ticked**, grouped by semester. Student unticks what they have not done, optionally adds a grade,
   can mark a backlog, and can search/add electives. This screen should make it obvious that the app knows the institute.
3. **Your goal (natural language):** a large text box with 3–4 example prompts the student can click
   (e.g. "I'm in Mech and want to get into AI/ML or data science by placements"). Submit → LLM parse (mock for now) →
   **confirm card**: "We understood: ML Engineer · placement by Year 4. Correct?" with Edit. If the parse asks a
   clarifying question, show it inline as a follow-up. If the student is unsure, enter **explore mode**: show
   3–4 career paths for their branch (from API) and explain that they will try a short glimpse of each.
4. **What this goal needs (value preview):** list the goal's key skills and which ones their completed courses already
   partly cover. Short, motivating, honest.
5. **Experience & self-check (optional):** projects, coding practice, internships; a confidence slider per key skill.
   Label clearly that self-ratings are checked later by a short test.
6. **Time & constraints:** hours per week (slider), credits this semester, courses not to take together.
7. **Diagnostic intro:** "A short adaptive test (~15 min) so the plan starts at your level." Start button (the test
   itself is a later phase).

At the end, submit the profile in the format of `PUT /students/{id}/profile` (see the Student Intelligence contract).

## Done when
- `npm run dev` shows login → onboarding end to end with mock data, for each demo persona.
- Lint and type-check pass; no network requests to external hosts (check the browser network tab).
- Screenshots of each screen at desktop and phone width are saved in `frontend/screenshots/`.
