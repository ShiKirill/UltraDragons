import { ColumnConfig } from "@/shared/components/base/app-table/types";

import { IPlace } from "@/api/crud/places/types";

export const columns: ColumnConfig<IPlace>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "website",
    label: "Website",
  },
  {
    key: "tg",
    label: "Telegram",
  },
  {
    key: "zalo",
    label: "Zalo",
  },
  {
    key: "start_time",
    label: "Start Time",
  },
  {
    key: "end_time",
    label: "End Time",
  },
  {
    key: "lat",
    label: "Latitude",
  },
  {
    key: "lon",
    label: "Longitude",
  },
  {
    key: "interest_category_ids",
    label: "Interest Category IDs",
  },
  {
    key: "picture_ids",
    label: "Picture IDs",
  },
  {
    key: "city_id",
    label: "City ID",
  },
  {
    key: "is_deleted",
    label: "Is Deleted",
  },
];
