import { IPicture } from "@/shared/types/common";

import { ApiClient, BASE_URL } from "@/api/client";

export const PICTURES_QUERY_KEY = "pictures";

class PicturesApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/pictures`);
  }

  async getPictures(): Promise<IPicture[]> {
    return this.get<IPicture[]>("");
  }

  async deletePicture(id: number): Promise<void> {
    return this.delete<void>(`/${id}`);
  }
}

export const picturesApi = new PicturesApi();
