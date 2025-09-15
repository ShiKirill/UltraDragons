import Image from "next/image";

import { ColumnConfig } from "@/shared/components/base/app-table/types";

import { IInterest } from "@/api/crud/interests/types";

export const columns: ColumnConfig<IInterest>[] = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "icon_url",
    label: "Icon",
    render: (value) =>
      value ? (
        <Image
          src={value}
          alt="icon"
          width={28}
          height={28}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      ) : null,
  },
];
