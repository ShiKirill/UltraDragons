import { CSSProperties, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormSelect } from "@/shared/components/form/select";
import { FormTextField } from "@/shared/components/form/text-field";
import { ROLES } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";

import { IUser, IUserCreateDto, IUserUpdateDto } from "@/api/crud/users/types";

import { UserCreateSchema, userCreateSchema } from "./schema";
import { styles } from "./styles";

interface UserFormProps {
  onSubmit: (data: IUserCreateDto | IUserUpdateDto) => void;
  editingItem?: IUser | null;
  isEdit: boolean;
  onCancel: () => void;
}

export const UserForm = ({
  onSubmit,
  editingItem,
  isEdit,
  onCancel,
}: UserFormProps) => {
  const form = useForm<UserCreateSchema>({
    resolver: zodResolver(userCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: editingItem?.name || "",
    },
  });

  const handleSubmit = async (data: UserCreateSchema) => {
    const submitData =
      isEdit && editingItem
        ? ({ ...data, id: editingItem.id } as IUserUpdateDto)
        : (data as IUserCreateDto);

    await onSubmit(submitData);
    onCancel();
  };

  useEffect(() => {
    if (isEdit && editingItem) {
      form.reset({
        name: editingItem.name,
        email: editingItem.email,
        role: editingItem.role,
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
        <FormTextField name="name" label="Name" placeholder="Enter user name" />

        <FormTextField
          name="email"
          label="Email"
          placeholder="Enter user email"
        />

        <FormSelect name="role" label="Role" options={ROLES} />

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
