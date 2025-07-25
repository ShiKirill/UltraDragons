import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";

import { styles } from "./AppHeader.styles";

export function AppHeader() {
  return (
    <Box sx={styles.wrapper} component="header">
      <Box sx={styles.logo}>
        <DashboardIcon sx={styles.logoIcon} />
        <Typography variant="h6" component="span">
          UltraDragons Admin
        </Typography>
      </Box>

      <Box sx={styles.userMenu}>
        <Avatar>A</Avatar>
        <Typography variant="body2">Admin User</Typography>
      </Box>
    </Box>
  );
}
