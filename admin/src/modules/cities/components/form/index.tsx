import { CSSProperties } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormTextField } from "@/shared/components/form/text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";

import { ICityCreateDto } from "@/api/crud/cities/types";

import { CityCreateSchema, cityCreateSchema, defaultValues } from "./schema";
import { styles } from "./styles";

interface CityFormProps {
  onSubmit: (data: ICityCreateDto) => void;
  onCancel: () => void;
}

export const CityForm = ({ onSubmit, onCancel }: CityFormProps) => {
  const form = useForm<CityCreateSchema>({
    resolver: zodResolver(cityCreateSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const handleSubmit = async (data: CityCreateSchema) => {
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
          name="name"
          label="Name"
          placeholder="Enter place name"
        />

        <FormTextField
          name="timezone"
          label="Timezone"
          placeholder="Enter place timezone"
        />

        <FormTextField
          name="lat"
          label="Latitude"
          type="number"
          placeholder="Enter place latitude"
        />

        <FormTextField
          name="lon"
          label="Longitude"
          type="number"
          placeholder="Enter place longitude"
        />

        <FormTextField
          name="bbox_top_left_lat"
          label="Bbox top left latitude"
          type="number"
          placeholder="Enter place bbox top left latitude"
        />

        <FormTextField
          name="bbox_top_left_lon"
          label="Bbox top left longitude"
          type="number"
          placeholder="Enter place bbox top left longitude"
        />

        <FormTextField
          name="bbox_bottom_right_lat"
          label="Bbox bottom right latitude"
          type="number"
          placeholder="Enter place bbox bottom right latitude"
        />

        <FormTextField
          name="bbox_bottom_right_lon"
          label="Bbox bottom right longitude"
          type="number"
          placeholder="Enter place bbox bottom right longitude"
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
