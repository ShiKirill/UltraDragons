export enum Role {
  User,
  Admin,
}

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type Nullable<T> = T | null;
