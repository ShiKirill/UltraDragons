export interface FormField<T> {
  key: keyof T;
  label?: string;
  type?: "text" | "email" | "number" | "url";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export interface ColumnConfig<T> {
  key: keyof T;
  label?: string;
  render?: (value: string, row: T) => React.ReactNode;
}
