import { useTranslations } from "next-intl";

import { Box } from "@mui/material";

import { Map } from "../map";
import { styles } from "./styles";

export const Home = () => {
  const t = useTranslations("HomePage");

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.left}>
        <Map />
      </Box>
      <Box sx={styles.right}>right</Box>
    </Box>
  );
};
