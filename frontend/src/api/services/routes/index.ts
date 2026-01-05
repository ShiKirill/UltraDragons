import { ApiClient, BASE_URL } from "@/api/client";

import { mockPlaces } from "./mock";
import { IRoute } from "./types";

export const ROUTES_QUERY_KEY = "routes";

class RoutesApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/routes`);
  }

  async createRoute(sessionId: number): Promise<IRoute> {
    // return this.post<IRoute>("");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          title: "Route 1",
          icon_url: "https://example.com/icon.png",
          sessionId: 1,
          userId: 1,
          places: mockPlaces,
        } as IRoute);
      }, 1000);
    });
  }
}

export const routesApi = new RoutesApi();
