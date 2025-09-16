import Image from "next/image";

import { ColumnConfig } from "@/shared/components/base/app-table/types";
import { IPicture } from "@/shared/types/common";

export const columns: ColumnConfig<IPicture>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "file_name",
    label: "File Name",
  },
  {
    key: "file_type",
    label: "File Type",
  },
  {
    key: "url",
    label: "Image",
    render: (value) => {
      return (
        <Image
          src={value as string}
          style={{ objectFit: "cover", borderRadius: "50%" }}
          alt="Picture"
          width={28}
          height={28}
        />
      );
    },
  },
];
