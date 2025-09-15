import { z } from "zod";

export const interestCreateSchema = z.object({
  title: z.string().min(1, "Required"),
  icon_url: z.string().min(1, "Required"),
});

export type InterestsCreateSchema = z.infer<typeof interestCreateSchema>;
