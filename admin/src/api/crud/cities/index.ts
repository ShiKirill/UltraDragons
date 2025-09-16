import { ApiClient, BASE_URL } from "@/api/client";

import { ICity, ICityCreateDto } from "./types";

export const CITIES_QUERY_KEY = "cities";

class CitiesApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/cities`);
  }

  async getCities(): Promise<ICity[]> {
    return this.get<ICity[]>("");
  }

  async getCity(id: number): Promise<ICity> {
    return this.get<ICity>(`/${id}`);
  }

  async createCity(data: ICityCreateDto): Promise<ICity> {
    return this.post<ICity>("", data);
  }

  async deleteCity(cityId: number): Promise<void> {
    return this.delete<void>(`/${cityId}`);
  }
}

export const citiesApi = new CitiesApi();
