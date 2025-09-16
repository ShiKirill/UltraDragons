import { Role } from "@/shared/types/common";
import { z } from "zod";

import { IUserCreateDto } from "@/api/crud/users/types";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.email("Invalid email"),
  role: z.enum(Role),
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  id: z.string(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export type UserCreateSchema = z.infer<typeof userCreateSchema>;

export const defaultValues: Partial<IUserCreateDto> = {
  name: "",
  email: "",
  role: 0,
};
