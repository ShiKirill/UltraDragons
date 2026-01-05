"use-client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { AppTabs } from "@/shared/components/tabs";
import { Box, Button } from "@mui/material";

import { IPlace } from "@/api/services/types";

import { DescriptionTab } from "../description-tab";
import { styles } from "./styles";

export const PlaceCard = ({ place }: { place: IPlace }) => {
  const t = useTranslations("RoutesPage");

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.imageWrapper}>
        <Image
          // TODO: use main cover picture
          src={place.pictures?.[0] ?? ""}
          alt={place.name}
          width={300}
          height={300}
        />
      </Box>

      <Box sx={styles.textWrapper}>
        <AppTabs
          firstTab={{
            label: t("descriptionTab"),
            content: <DescriptionTab place={place} />,
          }}
          secondTab={{ label: t("reviewsTab") }}
          thirdTab={{
            label: t("rateTab"),
            content: <div>{t("rateTab")}</div>,
          }}
        >
          <Box sx={styles.buttonWrapper}>
            <Button fullWidth variant="contained">
              {t("readyBtn")}
            </Button>
          </Box>
        </AppTabs>
      </Box>
    </Box>
  );
};
