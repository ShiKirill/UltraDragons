import { MouseEvent } from "react";

import { styled } from "@mui/material";

interface StyledArrowProps {
  disabled?: boolean;
  left?: boolean;
}

const StyledArrow = styled("button", {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "left",
})<StyledArrowProps>(({ disabled, left }) => ({
  position: "absolute",
  top: "80%",
  width: 40,
  height: 40,
  transform: "translateY(-50%)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "50%",
  border: "none",
  background: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",

  transition: "opacity 0.3s",

  cursor: disabled ? "default" : "pointer",
  pointerEvents: disabled ? "none" : "auto",

  ...(left ? { left: 24 } : { right: 24 }),

  "&:hover": {
    opacity: 0.5,
  },
}));

const ArrowIcon = styled("svg")(({ theme }) => ({
  width: 20,
  height: 20,
  fill: theme.palette.common.black,
}));

export function Arrow(props: {
  disabled?: boolean;
  left?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <StyledArrow
      onClick={props.onClick}
      disabled={props.disabled}
      left={props.left}
    >
      <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {props.left ? (
          <path
            d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            fill={"white"}
          />
        ) : (
          <path
            d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
            fill={"white"}
          />
        )}
      </ArrowIcon>
    </StyledArrow>
  );
}
