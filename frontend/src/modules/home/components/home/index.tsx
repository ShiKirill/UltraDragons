import { useState } from "react";

import { STEPS, Step } from "@/modules/home/types";
import { Box, Divider } from "@mui/material";

import { Map } from "../map";
import { StartBtn } from "../start";
import { StepWrapper } from "../step-wrapper";
import { HomeTabs } from "../tabs";
import { styles } from "./styles";

export const Home = () => {
  const [step, setStep] = useState<Step>(STEPS.START);

  const handleStep = (step: Step) => {
    setStep(step);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.mapWrapper}>
        <Map />
      </Box>

      <Divider
        variant="middle"
        sx={styles.divider}
        orientation="vertical"
        flexItem
      />

      <StepWrapper>
        {step === STEPS.START && <StartBtn onChangeStep={handleStep} />}
        {step === STEPS.INTERESTS && <HomeTabs />}
      </StepWrapper>
    </Box>
  );
};
