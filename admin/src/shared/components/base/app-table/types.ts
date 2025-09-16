export interface ColumnConfig<T, K extends keyof T = keyof T> {
  key: K;
  label?: string;
  render?: (value: T[K], row: T) => React.ReactNode;
}
