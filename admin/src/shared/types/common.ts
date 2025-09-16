export enum Role {
  User,
  Admin,
}

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface IPicture {
  id: number;
  url: string;
  file_name: string;
  file_type: string;
}

export type Nullable<T> = T | null;
