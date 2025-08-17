import { Box, Typography } from "@mui/material";

import { styles } from "./styles";

interface HeaderBlockProps {
  title: string;
  description?: string;
}

export const HeaderBlock = ({ title, description }: HeaderBlockProps) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5">{title}</Typography>

      {description && <Typography variant="body1">{description}</Typography>}
    </Box>
  );
};
