import { ApiClient, BASE_URL } from "@/api/client";

import { IPlace, IPlaceCreateDto, IPlaceUpdateDto } from "./types";

export const PLACES_QUERY_KEY = "places";

class PlacesApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/places`);
  }

  async getPlaces(): Promise<IPlace[]> {
    return this.get<IPlace[]>("");
  }

  async createPlace(data: IPlaceCreateDto): Promise<IPlace> {
    return this.post<IPlace>("", data);
  }

  async updatePlace(id: string, data: IPlaceUpdateDto): Promise<IPlace> {
    return this.put<IPlace>(`/${id}`, data);
  }

  async deletePlace(id: string): Promise<void> {
    return this.delete<void>(`/${id}`);
  }
}

export const placesApi = new PlacesApi();
