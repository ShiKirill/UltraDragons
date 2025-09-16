import Image from "next/image";

import { ColumnConfig } from "@/shared/components/base/app-table/types";
import { isValidImageUrl } from "@/shared/utils/isValidUrl";

import { IInterest } from "@/api/crud/interests/types";

export const columns: ColumnConfig<IInterest>[] = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "icon_url",
    label: "Icon",
    render: (value) => {
      if (!value || !isValidImageUrl(value as string)) {
        return null;
      }

      return (
        <Image
          src={value as string}
          alt="icon"
          width={28}
          height={28}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      );
    },
  },
];
