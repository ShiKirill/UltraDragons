"use-client";

import RejectIcon from "@/shared/icons/buttons/reject.svg";
import { ButtonProps, IconButton } from "@mui/material";

import { styles } from "./styles";

export const RejectButton = (props: ButtonProps) => {
  return (
    <IconButton disableRipple sx={styles.wrapper} {...props}>
      <RejectIcon />
    </IconButton>
  );
};
