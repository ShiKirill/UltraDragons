import Link from "next/link";
import { useRouter } from "next/router";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { mainNavItems } from "./constants";
import { styles } from "./styles";

export const SideBar = () => {
  const router = useRouter();

  return (
    <Box component="aside" sx={styles.sidebar}>
      <List sx={styles.list}>
        {mainNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            currentPath={router.pathname}
          />
        ))}
      </List>
    </Box>
  );
};

function NavItem({
  href,
  label,
  icon: Icon,
  currentPath,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ sx?: object }>;
  currentPath: string;
}) {
  const isActive = currentPath.startsWith(href);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={href}
        sx={{
          ...styles.navItem,
          ...(isActive && styles.navItemActive),
        }}
      >
        <ListItemText primary={label} />

        <Icon sx={styles.navItemIcon} />
      </ListItemButton>
    </ListItem>
  );
}
