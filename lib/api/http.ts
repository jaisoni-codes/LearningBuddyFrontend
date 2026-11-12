import { ApiError, type AuthApi } from "./types";

// Same-origin by default; the backend is proxied behind the frontend in docker-compose.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check that the backend is running.");
  }
  const body = await res.json().catch(() => undefined);
  if (!res.ok) {
    const detail = (body as { detail?: unknown } | undefined)?.detail;
    throw new ApiError(res.status, typeof detail === "string" ? detail : `Request failed (${res.status}).`, body);
  }
  return body as T;
}

const post = <T>(path: string, data: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(data) });

export const httpAuthApi: AuthApi = {
  login: (body) => post("/auth/login", body),
  signup: (body) => post("/auth/signup", body),
  getDemoPersonas: () => request("/auth/demo-personas"),
  demoLogin: (persona_id) => post("/auth/demo-login", { persona_id }),
};
