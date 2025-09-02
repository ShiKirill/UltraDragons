import { Box, Button, Stack, TextField } from "@mui/material";

import { FormField } from "../types";

interface CrudFormProps<T> {
  fields: FormField<T>[];
  data: Partial<T>;
  onChange?: (field: keyof T, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export const CrudForm = <T,>({
  fields,
  data,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSubmitting = false,
}: CrudFormProps<T>) => {
  const isValid = fields
    .filter((field) => field.required)
    .every((field) => data[field.key]);

  return (
    <Stack spacing={2} component="form" onSubmit={onSubmit}>
      {fields.map((field) => (
        <TextField
          key={String(field.key)}
          type={field.type || "text"}
          label={field.label}
          placeholder={field.placeholder}
          value={data[field.key] || ""}
          onChange={(e) => onChange?.(field.key, e.target.value)}
          required={field.required}
          multiline={field.multiline}
          rows={field.rows}
          size="small"
          fullWidth
        />
      ))}

      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          {submitLabel}
        </Button>
      </Box>
    </Stack>
  );
};
