import { ReactNode, useEffect, useRef } from "react";

import { Box, styled } from "@mui/material";
import gsap from "gsap";

const StyledWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  flexBasis: "40%",
}));

export const StepWrapper = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
    );
  }, [children]);

  return <StyledWrapper ref={ref}>{children}</StyledWrapper>;
};
