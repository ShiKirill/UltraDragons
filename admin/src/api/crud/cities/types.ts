export interface ICity {
  id: string;
  name: string;
  lat: string;
  lon: string;
  timezone: string;
  bbox_top_left_lat?: string;
  bbox_top_left_lon?: string;
  bbox_bottom_right_lat?: string;
  bbox_bottom_right_lon?: string;
}

export type ICityCreateDto = Omit<ICity, "id">;
