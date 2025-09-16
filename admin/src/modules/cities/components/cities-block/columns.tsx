import { ColumnConfig } from "@/shared/components/base/app-table/types";

import { ICity } from "@/api/crud/cities/types";

export const columns: ColumnConfig<ICity>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Title",
  },
  {
    key: "timezone",
    label: "Timezone",
  },
];
