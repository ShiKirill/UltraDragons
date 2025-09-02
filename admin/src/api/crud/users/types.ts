export interface IUser {
  id: string;
  name: string;
  email: string;
  email_confirmed?: boolean;
  // TODO: enum
  role?: number;
  avatarId?: number;
  is_deleted?: boolean;
}

export type IUserCreateDto = Omit<IUser, "id">;

export type IUserUpdateDto = Partial<IUser> & { id: string };
