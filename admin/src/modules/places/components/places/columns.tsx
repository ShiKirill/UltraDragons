import Image from "next/image";

import { ColumnConfig } from "@/shared/components/base/app-table/types";
import { Typography } from "@mui/material";

import { IPlace } from "@/api/crud/places/types";

export const columns: ColumnConfig<IPlace, keyof IPlace>[] = [
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
    key: "interestCategories",
    label: "Interests",
    render: (value) => {
      const interests = value as IPlace["interestCategories"];
      return (
        <Typography>
          {interests?.map((interest) => interest.title).join(", ")}
        </Typography>
      );
    },
  },
  {
    key: "pictures",
    label: "Picture IDs",
    render: (value) => {
      const pictures = value as IPlace["pictures"];

      return (
        <div>
          {pictures?.map((picture) => {
            return (
              <Image
                key={picture.id}
                src={picture.url}
                alt={picture.file_name}
                width={28}
                height={28}
              />
            );
          })}
        </div>
      );
    },
  },
  {
    key: "city",
    label: "City",
    render: (value) => {
      const city = value as IPlace["city"];
      return <Typography>{city?.name || "N/A"}</Typography>;
    },
  },
  {
    key: "is_deleted",
    label: "Is Deleted",
  },
];
