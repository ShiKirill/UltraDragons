export const STEPS = {
  START: "start",
  INTERESTS: "interests",
} as const;

export type Step = (typeof STEPS)[keyof typeof STEPS];
