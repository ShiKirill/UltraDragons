import { ApiClient, BASE_URL } from "@/api/client";

import mockData from "./mock-data.json";
import { Interest } from "./types";

export const INTERESTS_QUERY_KEY = "interests";

class InterestsApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/user-service/api/v1`);
  }

  async getInterests(): Promise<Interest[]> {
    // uses mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.interests);
      }, 1000);
    });

    // uncomment to use real API:
    // return this.get<UserInterestsList>("/web/user/profile");
  }
}

export const interestsApi = new InterestsApi();
