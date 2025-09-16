import { z } from "zod";

import { ICityCreateDto } from "@/api/crud/cities/types";

export const cityCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  lat: z.number("Required"),
  lon: z.number("Required"),
  timezone: z.string().min(1, "Required"),
  bbox_top_left_lat: z.number().optional(),
  bbox_top_left_lon: z.number().optional(),
  bbox_bottom_right_lat: z.number().optional(),
  bbox_bottom_right_lon: z.number().optional(),
});

export type CityCreateSchema = z.infer<typeof cityCreateSchema>;

export const defaultValues: Partial<ICityCreateDto> = {
  name: "",
};
