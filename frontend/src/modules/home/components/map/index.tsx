import { Box } from "@mui/material";

import { StyledImage, styles } from "./styles";

export const Map = () => {
  return (
    <Box sx={styles.wrapper}>
      <StyledImage
        src="/assets/home/map.webp"
        alt="map"
        width={400}
        height={600}
        objectFit="cover"
      />
      {/* <LeaderLine
        from={{ x: 300, y: 150 }}
        middle={{ x: 350, y: 150 }}
        to={{ x: 380, y: 60 }}
      /> */}
    </Box>
  );
};
