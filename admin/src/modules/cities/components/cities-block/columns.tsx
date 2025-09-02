import {
  ColumnConfig,
  FormField,
} from "@/shared/components/base/crud-block/types";

import { ICity, ICityCreateDto } from "@/api/crud/cities/types";

export const formFields: FormField<ICityCreateDto>[] = [
  {
    key: "name",
    placeholder: "Enter city name",
    required: true,
  },
  {
    key: "lat",
    type: "number",
    required: true,
    placeholder: "Enter city latitude",
  },
  {
    key: "lon",
    type: "number",
    required: true,
    placeholder: "Enter city longitude",
  },
  {
    key: "timezone",
    type: "text",
    required: true,
    placeholder: "Enter city timezone",
  },
  {
    key: "bbox_top_left_lat",
    type: "number",
    placeholder: "Enter city bbox top left latitude",
  },
  {
    key: "bbox_top_left_lon",
    type: "number",
    placeholder: "Enter city bbox top left longitude",
  },
  {
    key: "bbox_bottom_right_lat",
    type: "number",
    placeholder: "Enter city bbox bottom right latitude",
  },
  {
    key: "bbox_bottom_right_lon",
    type: "number",
    placeholder: "Enter city bbox bottom right longitude",
  },
];

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
