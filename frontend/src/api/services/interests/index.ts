import { ApiClient, BASE_URL } from "@/api/client";

import { interestsMock } from "./mock";
import { IInterest, IInterestCreateDto } from "./types";

export const INTERESTS_QUERY_KEY = "interests";

class InterestsApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/interest-categories`);
  }

  async getInterests(): Promise<IInterest[]> {
    // return this.get<IInterest[]>("");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(interestsMock);
      }, 1000);
    });
  }

  async createInterest(data: IInterestCreateDto): Promise<IInterest> {
    return this.post<IInterest>("", data);
  }

  async deleteInterest(id: number): Promise<void> {
    return this.delete<void>(`/${id}`);
  }
}

export const interestsApi = new InterestsApi();
