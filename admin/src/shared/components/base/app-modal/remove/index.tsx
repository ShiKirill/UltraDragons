import { Box, Button, Stack, Typography } from "@mui/material";

interface DeleteModalProps<T> {
  item: T | null;
  title: string;
  itemNameField: keyof T;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export const DeleteModal = <T,>({
  item,
  title,
  itemNameField,
  onSubmit,
  onCancel,
  submitLabel = "Delete",
  isSubmitting = false,
}: DeleteModalProps<T>) => {
  if (!item) return null;

  const itemName = String(item[itemNameField] || "Unknown");

  return (
    <Stack spacing={2}>
      <Typography variant="body1" color="text.secondary">
        Are you sure you want to delete this {title.toLowerCase()}?
      </Typography>

      <Typography component="div" color="warning.main">
        {itemName}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={onCancel} variant="outlined" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="error"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : submitLabel}
        </Button>
      </Box>
    </Stack>
  );
};
