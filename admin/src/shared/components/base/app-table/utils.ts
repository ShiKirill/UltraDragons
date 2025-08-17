import { ColumnConfig } from "./types";

export const extractColumns = <T extends object>(
  data: T[],
): ColumnConfig<T>[] => {
  if (data.length === 0) return [];

  return Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));
};
