import type { AuthResponse } from "./api/types";

const KEY = "lb.session";

/** remember=true keeps the session after the browser closes (localStorage); otherwise this tab only. */
export function saveSession(session: AuthResponse, remember = false) {
  try {
    clearSession();
    (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(session));
  } catch {
    // Storage blocked (private mode etc.): the session lasts for this page only.
  }
}

export function getSession(): AuthResponse | null {
  try {
    const raw = sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthResponse) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  } catch {}
}
