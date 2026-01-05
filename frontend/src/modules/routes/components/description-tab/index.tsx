"use-client";

import { Box, Divider, Typography } from "@mui/material";

import { IPlace } from "@/api/services/types";

import { styles } from "./styles";

export const DescriptionTab = ({ place }: { place: IPlace }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.header}>
        <Typography variant="h5">{place.name}</Typography>
      </Box>

      <Box sx={styles.content}>
        <Typography variant="body1">{place.description}</Typography>
        <Divider orientation="vertical" />
        <Box sx={styles.contentRight}>asdas</Box>
      </Box>
    </Box>
  );
};
