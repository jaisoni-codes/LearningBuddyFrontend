// Shapes from docs/contracts/frontend_onboarding_api.md (DRAFT v0.1). Change the contract first.

export type AuthResponse = { token: string; student_id: string };

export type DemoPersona = { persona_id: string; title: string; subtitle: string };

export type LoginRequest = { email: string; password: string };
export type SignupRequest = { email: string; password: string; name: string };

export interface AuthApi {
  login(body: LoginRequest): Promise<AuthResponse>;
  signup(body: SignupRequest): Promise<AuthResponse>;
  getDemoPersonas(): Promise<DemoPersona[]>;
  demoLogin(personaId: string): Promise<AuthResponse>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
