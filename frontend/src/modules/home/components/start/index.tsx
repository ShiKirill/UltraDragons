import { useTranslations } from "next-intl";

import { STEPS, Step } from "@/modules/home/types";
import { Box, Button } from "@mui/material";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { styles } from "./styles";

gsap.registerPlugin(SplitText);

interface IProps {
  onChangeStep: (step: Step) => void;
}

export const StartBtn = ({ onChangeStep }: IProps) => {
  const t = useTranslations("HomePage");

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.buttonWrapper}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onChangeStep(STEPS.INTERESTS)}
        >
          {t("startButton")}
        </Button>

        <Button disableRipple variant="text">
          {t("lastRouteButton")}
        </Button>
      </Box>
    </Box>
  );
};
