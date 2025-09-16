import { CSSProperties, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormSelect } from "@/shared/components/form/select";
import { FormTextField } from "@/shared/components/form/text-field";
import { ISelectOption } from "@/shared/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";

import {
  IPlace,
  IPlaceCreateDto,
  IPlaceUpdateDto,
} from "@/api/crud/places/types";

import { PlaceCreateSchema, defaultValues, placeCreateSchema } from "./schema";
import { styles } from "./styles";

interface PlaceFormProps {
  onSubmit: (data: IPlaceCreateDto | IPlaceUpdateDto) => void;
  editingItem?: IPlace | null;
  cities: ISelectOption[];
  interests: ISelectOption[];
  pictures: ISelectOption[];
  isEdit: boolean;
  onCancel: () => void;
}

export const PlaceForm = ({
  onSubmit,
  cities,
  interests,
  pictures,
  editingItem,
  isEdit,
  onCancel,
}: PlaceFormProps) => {
  const form = useForm<PlaceCreateSchema>({
    resolver: zodResolver(placeCreateSchema),
    mode: "onSubmit",
    defaultValues,
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
        description: editingItem.description,
        address: editingItem.address,
        lat: editingItem.lat,
        lon: editingItem.lon,
        city_id: editingItem.city.id,
        website: editingItem.website,
        tg: editingItem.tg,
        zalo: editingItem.zalo,
        start_time: editingItem.start_time,
        end_time: editingItem.end_time,
        interest_category_ids: editingItem.interestCategories?.map(
          (interest) => interest.id,
        ),
        picture_ids: editingItem.pictures?.map((picture) => picture.id),
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
          type="number"
          placeholder="Enter place latitude"
        />

        <FormTextField
          name="lon"
          label="Longitude"
          type="number"
          placeholder="Enter place longitude"
        />

        <FormSelect name="city_id" label="City" options={cities} />

        <FormSelect
          name="interest_category_ids"
          label="Interests"
          multiple
          options={interests}
        />

        <FormSelect
          name="picture_ids"
          label="Picture IDs"
          multiple
          options={pictures}
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
