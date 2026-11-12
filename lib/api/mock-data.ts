import type { DemoPersona } from "./types";

// Mock-only seed data. Replace with real backend data once it exists.

export const MOCK_DEMO_PERSONAS: DemoPersona[] = [
  {
    persona_id: "demo_mech_y2",
    title: "Mechanical Engineering, Year 2",
    subtitle: "Wants an AI/ML or data science role by placements",
  },
  {
    persona_id: "demo_chem_y3",
    title: "Chemical Engineering, Year 3",
    subtitle: "Not sure yet, something in core chemical",
  },
  {
    // PLACEHOLDER: the non-tech persona is not finalised by the team yet.
    persona_id: "demo_ee_y3",
    title: "Electrical Engineering, Year 3",
    subtitle: "Thinking about product management instead of core",
  },
];

/** Test account for the mock login (mock layer only, never a real user). */
export const MOCK_TEST_ACCOUNT = {
  email: "test.student@example.edu",
  password: "mock-pass-1234",
  student_id: "stu_test_001",
};
