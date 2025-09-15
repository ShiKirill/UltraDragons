import { z } from "zod";

import { ICityCreateDto } from "@/api/crud/cities/types";

export const cityCreateSchema = z.object({
  name: z.string().min(1, "Required"),
  lat: z.string().min(1, "Required"),
  lon: z.string().min(1, "Required"),
  timezone: z.string().min(1, "Required"),
  bbox_top_left_lat: z.string().optional(),
  bbox_top_left_lon: z.string().optional(),
  bbox_bottom_right_lat: z.string().optional(),
  bbox_bottom_right_lon: z.string().optional(),
});

export type CityCreateSchema = z.infer<typeof cityCreateSchema>;

export const defaultValues: Partial<ICityCreateDto> = {
  name: "",
  lat: "",
  lon: "",
  timezone: "",
};
