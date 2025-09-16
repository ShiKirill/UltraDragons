import { z } from "zod";

import { IInterestCreateDto } from "@/api/crud/interests/types";

export const interestCreateSchema = z.object({
  title: z.string().min(1, "Required"),
  icon_url: z.url("Invalid URL"),
});

export type InterestsCreateSchema = z.infer<typeof interestCreateSchema>;

export const defaultValues: Partial<IInterestCreateDto> = {
  title: "",
  icon_url: "",
};
