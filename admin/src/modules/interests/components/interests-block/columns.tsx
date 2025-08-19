import Image from "next/image";

import {
  ColumnConfig,
  FormField,
} from "@/shared/components/base/crud-block/types";

import { IInterest } from "@/api/crud/interests/types";

export const formFields: FormField<IInterest>[] = [
  {
    key: "title",
    placeholder: "Enter interest title",
    required: true,
  },
  {
    key: "icon_url",
    type: "url",
    required: true,
    placeholder: "Enter icon URL",
  },
];

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
