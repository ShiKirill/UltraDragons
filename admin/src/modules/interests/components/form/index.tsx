import { CSSProperties } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormTextField } from "@/shared/components/form/text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";

import {
  InterestsCreateSchema,
  defaultValues,
  interestCreateSchema,
} from "./schema";
import { styles } from "./styles";

interface PlaceFormProps {
  onSubmit: (data: InterestsCreateSchema) => void;
  onCancel: () => void;
}

export const InterestForm = ({ onSubmit, onCancel }: PlaceFormProps) => {
  const form = useForm<InterestsCreateSchema>({
    resolver: zodResolver(interestCreateSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const handleSubmit = async (data: InterestsCreateSchema) => {
    await onSubmit(data);
    onCancel();
  };

  return (
    <FormProvider {...form}>
      <form
        style={styles.form as CSSProperties}
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(handleSubmit)(e);
        }}
      >
        <FormTextField
          name="title"
          label="Title"
          placeholder="Enter interest title"
        />

        <FormTextField
          name="icon_url"
          label="Icon URL"
          placeholder="Enter interest icon URL"
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
