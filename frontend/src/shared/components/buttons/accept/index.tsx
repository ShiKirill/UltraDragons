"use-client";

import HeartIcon from "@/shared/icons/buttons/heart.svg";
import { ButtonProps, IconButton } from "@mui/material";

import { styles } from "./styles";

export const AcceptButton = (props: ButtonProps) => {
  return (
    <IconButton disableRipple sx={styles.wrapper} {...props}>
      <HeartIcon />
    </IconButton>
  );
};
