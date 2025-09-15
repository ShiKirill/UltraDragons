import { ColumnConfig } from "@/shared/components/base/app-table/types";
import { ROLES_MAP } from "@/shared/constants";
import { Role } from "@/shared/types/app";
import { Typography } from "@mui/material";

import { IUser } from "@/api/crud/users/types";

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
    render: (value) => {
      return <Typography>{ROLES_MAP[value as Role]}</Typography>;
    },
  },
];
