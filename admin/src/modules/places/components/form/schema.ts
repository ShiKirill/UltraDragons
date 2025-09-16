import { z } from "zod";

import { IPlaceCreateDto } from "@/api/crud/places/types";

export const placeCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  lat: z.number("Required"),
  lon: z.number("Required"),
  city_id: z.number("Required"),
  website: z.string().nullable().optional(),
  tg: z.string().nullable().optional(),
  zalo: z.string().nullable().optional(),
  start_time: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
  interest_category_ids: z.array(z.number()).optional(),
  picture_ids: z.array(z.number()).optional(),
});

export const placeUpdateSchema = placeCreateSchema.partial().extend({
  id: z.number(),
});

export type PlaceUpdateSchema = z.infer<typeof placeUpdateSchema>;

export type PlaceCreateSchema = z.infer<typeof placeCreateSchema>;

export const defaultValues: Partial<IPlaceCreateDto> = {
  name: "",
  description: "",
  address: "",
};
