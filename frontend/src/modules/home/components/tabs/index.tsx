import { useState } from "react";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useSelectionSessionMutation } from "@/modules/home/hooks/use-mutation";
import { useInterestsQuery } from "@/modules/home/hooks/use-query";
import { AppTabs } from "@/shared/components/tabs";
import { useRoutesStore } from "@/shared/stores/routes.store";
import { PAGES } from "@/shared/types/pages";
import { Box, Button } from "@mui/material";

import { Interests } from "../interests";
import { styles } from "./styles";

export const HomeTabs = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const { createSelectionSession, isCreating } = useSelectionSessionMutation();
  const { data: interests = [], isLoading: isInterestsLoading } =
    useInterestsQuery();
  const setSessionId = useRoutesStore((state) => state.setSessionId);

  const [selectedInterests, setSelectedInterests] = useState<Set<number>>(
    new Set(),
  );

  const handleSelectInterests = (interests: Set<number>) => {
    setSelectedInterests(interests);
  };

  const handleBuildRoute = async () => {
    const interestsIds = Array.from(selectedInterests);
    // TODO: get SessionId (back WIP)
    const data = await createSelectionSession({
      user_id: 8,
      interests_ids: interestsIds,
      city_id: 1,
    });

    setSessionId(data?.session_id ?? 1);
    router.push(PAGES.routes);
  };

  return (
    <Box sx={styles.wrapper}>
      <AppTabs
        firstTab={{
          content: (
            <Interests
              interests={interests}
              isLoading={isInterestsLoading}
              selectedInterests={selectedInterests}
              handleSelectInterests={handleSelectInterests}
            />
          ),
        }}
        secondTab={{
          content: <div>Item Two</div>,
        }}
        thirdTab={{
          content: <div>Item Three</div>,
        }}
      >
        <Box sx={styles.buttonWrapper}>
          <Button
            disabled={
              !selectedInterests.size || isInterestsLoading || isCreating
            }
            fullWidth
            onClick={handleBuildRoute}
            variant="contained"
          >
            {t("buildRouteButton")}
          </Button>
          <Button disableRipple variant="text">
            {t("lastRouteButton")}
          </Button>
        </Box>
      </AppTabs>
    </Box>
  );
};
