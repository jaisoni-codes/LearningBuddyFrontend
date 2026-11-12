# Learning Buddy: frontend

Student web app (Next.js + TypeScript + Tailwind). Right now it has the **login** and **sign-up** pages, running on a
mock API (no backend needed).

## Run it

1. Install **Node.js 20 or newer** (LTS from nodejs.org). Check with `node -v`.
2. Install packages (first time, and whenever `package-lock.json` changes):
   ```bash
   npm ci
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000. Stop with `Ctrl + C`.

Port 3000 busy? `npm run dev -- -p 3001`.
On Windows, if PowerShell says "running scripts is disabled", use Command Prompt (`cmd`) instead.

## Checks before you push

```bash
npm run lint
npm run typecheck
```

## Mock API

- All data comes from `lib/api/mock.ts` while `NEXT_PUBLIC_USE_MOCK` is not `0` (see `.env.example`).
- A test account for the login page is in `lib/api/mock-data.ts`. Any other email/password shows the "incorrect" error.
- Signing up with that test account's email shows the "already exists" error.

## Where things are

| Path | What |
|---|---|
| `app/login`, `app/signup` | Pages |
| `components/auth/auth-shell.tsx` | Shared split layout + dark brand panel |
| `components/login`, `components/signup` | The forms |
| `components/ui` | Button, text field, icons |
| `app/globals.css` | Theme tokens (colours, radius, font). Change colours here only. |
| `lib/api` | API types, mock and real HTTP clients |
| `CLAUDE.md` | Scope, design rules, status and next steps |

## Rules (from the problem statement)

- No calls to any external host at runtime: no CDNs, no Google login, no analytics. Fonts are bundled in `app/fonts`.
- One accent colour (`#D32F2F`), neutral greys, one font (Atkinson Hyperlegible Next).

## Working together

- Make a branch per feature (`git checkout -b onboarding-basics`), open a Pull Request, merge into `main`.
- `git pull` before you start. Don't both edit the same file at the same time.
- Always commit `package-lock.json`. Use `npm ci`, not `npm install`, to get identical versions.
