import { CSSProperties, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormTextField } from "@/shared/components/form/text-field";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  IPlace,
  IPlaceCreateDto,
  IPlaceUpdateDto,
} from "@/api/crud/places/types";

import { PlaceCreateSchema, placeCreateSchema } from "./schema";
import { styles } from "./styles";
import { Box, Button } from "@mui/material";

interface PlaceFormProps {
  onSubmit: (data: IPlaceCreateDto | IPlaceUpdateDto) => void;
  editingItem?: IPlace | null;
  isEdit: boolean;
  onCancel: () => void;
}

export const PlaceForm = ({
  onSubmit,
  editingItem,
  isEdit,
  onCancel,
}: PlaceFormProps) => {
  const form = useForm<PlaceCreateSchema>({
    resolver: zodResolver(placeCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: editingItem?.name || "",
    },
  });

  const handleSubmit = async (data: PlaceCreateSchema) => {
    const submitData =
      isEdit && editingItem
        ? ({ ...data, id: editingItem.id } as IPlaceUpdateDto)
        : (data as IPlaceCreateDto);

    await onSubmit(submitData);
    onCancel();
  };

  useEffect(() => {
    if (isEdit && editingItem) {
      form.reset({
        name: editingItem.name,
      });
      return;
    }

    form.reset({
      name: "",
    });
  }, [editingItem, isEdit, form]);

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
          name="description"
          label="Description"
          placeholder="Enter place description"
        />

        <FormTextField
          name="address"
          label="Address"
          placeholder="Enter place address"
        />

        <FormTextField
          name="lat"
          label="Latitude"
          placeholder="Enter place latitude"
        />

        <FormTextField
          name="lon"
          label="Longitude"
          placeholder="Enter place longitude"
        />

        <FormTextField
          name="city_id"
          label="City"
          placeholder="Enter place city"
        />

        <FormTextField
          name="website"
          label="Website"
          placeholder="Enter place website"
        />

        <FormTextField
          name="tg"
          label="Telegram"
          placeholder="Enter place telegram"
        />

        <FormTextField
          name="zalo"
          label="Zalo"
          placeholder="Enter place zalo"
        />

        <FormTextField
          name="start_time"
          label="Start time"
          placeholder="Enter place start time"
        />

        <FormTextField
          name="end_time"
          label="End time"
          placeholder="Enter place end time"
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
