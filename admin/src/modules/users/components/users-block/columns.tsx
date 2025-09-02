import {
  ColumnConfig,
  FormField,
} from "@/shared/components/base/crud-block/types";

import { IUser, IUserCreateDto } from "@/api/crud/users/types";

export const formFields: FormField<IUserCreateDto>[] = [
  {
    key: "name",
    placeholder: "Enter user name",
    required: true,
  },
  {
    key: "email",
    placeholder: "Enter user email",
    required: true,
    type: "email",
  },
];

export const columns: ColumnConfig<IUser>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
];
