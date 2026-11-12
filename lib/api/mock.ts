import { MOCK_DEMO_PERSONAS, MOCK_TEST_ACCOUNT } from "./mock-data";
import { ApiError, type AuthApi } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fakeToken = (id: string) => `mock.${id}.${Date.now()}`;

export const mockAuthApi: AuthApi = {
  async login({ email, password }) {
    await delay(700);
    if (email.trim().toLowerCase() === MOCK_TEST_ACCOUNT.email && password === MOCK_TEST_ACCOUNT.password) {
      return { token: fakeToken(MOCK_TEST_ACCOUNT.student_id), student_id: MOCK_TEST_ACCOUNT.student_id };
    }
    throw new ApiError(401, "Email or password is incorrect.");
  },

  async signup({ email }) {
    await delay(700);
    if (email.trim().toLowerCase() === MOCK_TEST_ACCOUNT.email) {
      throw new ApiError(409, "An account with this email already exists.");
    }
    const id = `stu_${email.split("@")[0].replace(/\W/g, "")}`;
    return { token: fakeToken(id), student_id: id };
  },

  async getDemoPersonas() {
    await delay(400);
    return MOCK_DEMO_PERSONAS;
  },

  async demoLogin(personaId) {
    await delay(500);
    if (!MOCK_DEMO_PERSONAS.some((p) => p.persona_id === personaId)) {
      throw new ApiError(404, "That demo student no longer exists.");
    }
    return { token: fakeToken(personaId), student_id: personaId };
  },
};
