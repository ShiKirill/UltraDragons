import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import type { SelectProps } from "@mui/material/Select";

import { styles } from "./styles";

export interface IFormSelectProps
  extends Omit<SelectProps, "error" | "onChange"> {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
}

export const FormSelect = (
  props: IFormSelectProps & { rules?: RegisterOptions },
) => {
  const { control } = useFormContext();
  const { name, rules, label, options, multiple, ...selectProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Box sx={styles.inputWrapper}>
          <FormControl fullWidth error={!!error?.message}>
            {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}

            <Select
              {...field}
              {...selectProps}
              labelId={`${name}-label`}
              multiple={multiple}
              value={field.value ?? (multiple ? [] : "")}
              onSelect={(evt) => {
                field.onChange(evt);
                selectProps.onSelect?.(evt);
              }}
              label={label}
              onFocus={(evt) => {
                selectProps.onFocus?.(evt);
              }}
            >
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error?.message && (
            <Typography sx={styles.errorMessage}>{error.message}</Typography>
          )}
        </Box>
      )}
    />
  );
};
