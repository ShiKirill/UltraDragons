import { ApiClient, BASE_URL } from "@/api/client";

import { ISelectionSession, ISelectionSessionCreateDto } from "./types";

export const SELECTION_SESSION_QUERY_KEY = "selection-session";

class SelectionSessionApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/selection-sessions`);
  }

  async createSelectionSession(
    data: ISelectionSessionCreateDto,
  ): Promise<ISelectionSession> {
    return this.post<ISelectionSession>("", data);
  }
}

export const selectionSessionApi = new SelectionSessionApi();
