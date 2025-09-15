import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";

import { Box, TextField, Typography } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

import { styles } from "./styles";

export interface IFormInputFieldProps
  extends Omit<TextFieldProps, "error" | "onChange"> {
  name: string;
}

export const FormTextField = (
  props: IFormInputFieldProps & { rules?: RegisterOptions },
) => {
  const {
    control,
    formState: { dirtyFields },
  } = useFormContext();
  const { name, type, rules, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { ref, ...fieldWithoutRef },
        fieldState: { error },
      }) => {
        return (
          <Box sx={styles.inputWrapper}>
            <TextField
              {...fieldWithoutRef}
              {...inputProps}
              ref={ref}
              sx={styles.input}
              error={!!error?.message}
              focused={isFocused || Boolean(dirtyFields[name])}
              type={type}
              onFocus={(evt) => {
                setIsFocused(true);
                inputProps.onFocus?.(evt);
              }}
              onBlur={(evt) => {
                setIsFocused(false);
                fieldWithoutRef.onBlur();
                inputProps.onBlur?.(evt);
              }}
            />

            {error?.message && (
              <Typography sx={styles.errorMessage}>{error?.message}</Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
