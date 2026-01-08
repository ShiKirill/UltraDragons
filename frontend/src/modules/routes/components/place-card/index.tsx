"use-client";

import { useTranslations } from "next-intl";

import { AcceptButton, RejectButton } from "@/shared/components/buttons";
import { AppTabs } from "@/shared/components/tabs";
import { Box, Button } from "@mui/material";

import { IPlace } from "@/api/services/types";

import { DescriptionTab } from "../description-tab";
import { ImageSlider } from "../image-slider";
import { styles } from "./styles";

export const PlaceCard = ({ place }: { place: IPlace }) => {
  const t = useTranslations("RoutesPage");

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.imageWrapper}>
        <ImageSlider images={place.pictures} />
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
            <RejectButton />

            <Button fullWidth variant="contained">
              {t("readyBtn")}
            </Button>

            <AcceptButton />
          </Box>
        </AppTabs>
      </Box>
    </Box>
  );
};
