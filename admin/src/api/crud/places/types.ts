export interface IPlace {
  id: string;
  name: string;
  description: string;
  address: string;
  website?: string;
  tg?: string;
  zalo?: string;
  start_time?: string;
  end_time?: string;
  lat: string;
  lon: string;
  interest_category_ids?: number[];
  picture_ids?: number[];
  city_id: string;
  is_deleted?: boolean;
}

export type IPlaceCreateDto = Omit<IPlace, "id | is_deleted">;

export type IPlaceUpdateDto = Partial<IPlace> & { id: string };
