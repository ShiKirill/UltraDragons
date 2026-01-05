export type Nullable<T> = T | null;

export interface ICity {
  id: number;
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  bbox_top_left_lat?: number;
  bbox_top_left_lon?: number;
  bbox_bottom_right_lat?: number;
  bbox_bottom_right_lon?: number;
}

export interface IPlace {
  id: number;
  name: string;
  description: string;
  address: string;
  lat: number;
  lon: number;
  city: ICity;
  website?: Nullable<string>;
  tg?: Nullable<string>;
  zalo?: Nullable<string>;
  start_time?: Nullable<string>;
  end_time?: Nullable<string>;
  is_deleted?: boolean;
  pictures?: string[];
  interest_categories?: number[];
}
