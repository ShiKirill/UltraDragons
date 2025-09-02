export interface ICity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  bbox_top_left_lat?: number;
  bbox_top_left_lon?: number;
  bbox_bottom_right_lat?: number;
  bbox_bottom_right_lon?: number;
}

export type ICityCreateDto = Omit<ICity, "id">;
