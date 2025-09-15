import { z } from "zod";

export const placeCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  lat: z.string(),
  lon: z.string(),
  city_id: z.string(),
  website: z.string().optional(),
  tg: z.string().optional(),
  zalo: z.string().optional(),
  start_time: z.string().optional().or(z.literal("")),
  end_time: z.string().optional().or(z.literal("")),
  interest_category_ids: z.array(z.number()).optional(),
  picture_ids: z.array(z.number()).optional(),
});

export const placeUpdateSchema = placeCreateSchema.partial().extend({
  id: z.string(),
});

export type PlaceUpdateSchema = z.infer<typeof placeUpdateSchema>;

export type PlaceCreateSchema = z.infer<typeof placeCreateSchema>;

// export const placeDefaultValues: Partial<IPlaceCreateDto> = {
//   name: "",
//   description: "",
//   address: "",
//   website: "",
//   tg: "",
//   zalo: "",
//   start_time: "",
//   end_time: "",
//   lat: 0,
//   lon: 0,
//   interest_category_ids: [],
//   picture_ids: [],
//   city_id: 0,
//   is_deleted: false,
// };
