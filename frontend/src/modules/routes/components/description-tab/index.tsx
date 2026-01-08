"use-client";

import AddressIcon from "@/shared/icons/routes/address.svg";
import WebIcon from "@/shared/icons/routes/website.svg";
import { Box, CSSProperties, Divider, Typography } from "@mui/material";

import { IPlace } from "@/api/services/types";

import { styles } from "./styles";

export const DescriptionTab = ({ place }: { place: IPlace }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.header}>
        <Typography variant="h5">{place.name}</Typography>
      </Box>

      <Box sx={styles.content}>
        <Typography sx={styles.description} variant="body1">
          {place.description}
        </Typography>

        <Divider orientation="vertical" />

        <Box component="ul" sx={styles.list}>
          {place.address && (
            <Box sx={styles.listItem} component="li">
              <AddressIcon style={styles.listItemIcon as CSSProperties} />

              <Typography variant="body1">{place.address}</Typography>
            </Box>
          )}

          {place.website && (
            <Box sx={styles.listItem} component="li">
              <WebIcon style={styles.listItemIcon as CSSProperties} />

              <Typography
                component="a"
                href={place.website}
                target="_blank"
                variant="body1"
              >
                {place.website}
              </Typography>
            </Box>
          )}

          {place.zalo && (
            <Box sx={styles.listItem} component="li">
              <WebIcon style={styles.listItemIcon as CSSProperties} />

              <Typography
                component="a"
                href={`https://zalo.me/${place.zalo}`}
                target="_blank"
                variant="body1"
              >
                {place.zalo}
              </Typography>
            </Box>
          )}

          {/* TODO: add start_time and end_time also work days, inst, facebook */}
        </Box>
      </Box>
    </Box>
  );
};
