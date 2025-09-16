import { ISelectOption } from "@/shared/types/common";
import { MenuItem, Select, type SelectProps } from "@mui/material";

interface AppSelectProps extends Omit<SelectProps, "options"> {
  options: ISelectOption[];
}

export const AppSelect = ({ options, ...props }: AppSelectProps) => {
  return (
    <Select {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
