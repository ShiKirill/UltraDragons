import { ApiClient, BASE_URL } from "@/api/client";

import { IUser, IUserCreateDto, IUserUpdateDto } from "./types";

export const USERS_QUERY_KEY = "users";

class UsersApi extends ApiClient {
  constructor() {
    super(`${BASE_URL}/users`);
  }

  async getUsers(): Promise<IUser[]> {
    return this.get<IUser[]>("");
  }

  async getUser(id: string): Promise<IUser> {
    return this.get<IUser>(`/${id}`);
  }

  async createUser(data: IUserCreateDto): Promise<IUser> {
    return this.post<IUser>("", data);
  }

  async updateUser(id: string, data: IUserUpdateDto): Promise<IUser> {
    return this.put<IUser>(`/${id}`, data);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.delete<void>(`/${userId}`);
  }
}

export const usersApi = new UsersApi();
