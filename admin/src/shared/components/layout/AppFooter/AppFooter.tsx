import { Box, Typography } from "@mui/material";

import { styles } from "./AppFooter.styles";

export function AppFooter() {
  return (
    <Box sx={styles.wrapper} component="footer">
      <Typography sx={styles.copyright}>
        {`© ${new Date().getFullYear()} UltraDragons. All rights reserved.`}
      </Typography>

      <Box sx={styles.links}>
        <Typography component="a" href="/privacy" sx={styles.link}>
          Privacy Policy
        </Typography>
        <Typography component="a" href="/terms" sx={styles.link}>
          Terms of Service
        </Typography>
        <Typography component="a" href="/support" sx={styles.link}>
          Support
        </Typography>
        <Typography sx={styles.version}>v1.0.0</Typography>
      </Box>
    </Box>
  );
}
