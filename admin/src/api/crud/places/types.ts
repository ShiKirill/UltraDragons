import { IPicture, Nullable } from "@/shared/types/common";

import { ICity } from "../cities/types";
import { IInterest } from "../interests/types";

export interface IPlaceCreateDto {
  name: string;
  description: string;
  address: string;
  lat: number;
  lon: number;
  city_id: number;
  website?: string;
  tg?: string;
  zalo?: string;
  start_time?: string;
  end_time?: string;
  interest_category_ids?: number[];
  picture_ids?: number[];
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
  interestCategories?: IInterest[];
  // TODO: add picture type
  pictures?: IPicture[];
  is_deleted?: boolean;
}

export type IPlaceUpdateDto = Partial<IPlace> & { id: number };
