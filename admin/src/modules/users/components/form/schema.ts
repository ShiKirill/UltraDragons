import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.email().min(1, "Required"),
  role: z.number().optional(),
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  id: z.string(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
