import { httpAuthApi } from "./http";
import { mockAuthApi } from "./mock";

/**
 * NEXT_PUBLIC_USE_MOCK=1 → mock data (default while the backend does not exist).
 * NEXT_PUBLIC_USE_MOCK=0 → real endpoints at NEXT_PUBLIC_API_BASE.
 */
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "0";

export const authApi = USE_MOCK ? mockAuthApi : httpAuthApi;

export * from "./types";
