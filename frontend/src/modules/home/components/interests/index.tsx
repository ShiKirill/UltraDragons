import Image from "next/image";

import { GradientLoader } from "@/shared/components/gradient-loader";
import { Box, CSSProperties, Typography } from "@mui/material";

import { IInterest } from "@/api/services/interests/types";

import { styles } from "./styles";

interface IProps {
  interests: IInterest[];
  isLoading: boolean;
  selectedInterests: Set<number>;
  handleSelectInterests: (interests: Set<number>) => void;
}

export const Interests = ({
  interests,
  isLoading,
  selectedInterests,
  handleSelectInterests,
}: IProps) => {
  const toggleInterest = (id: number) => {
    const newValues = new Set(selectedInterests);

    if (newValues.has(id)) {
      newValues.delete(id);
    } else {
      newValues.add(id);
    }

    handleSelectInterests(newValues);
  };

  if (isLoading) return <GradientLoader />;

  return (
    <Box sx={styles.wrapper}>
      {interests.map((interest) => {
        const isSelected = selectedInterests.has(interest.id);

        return (
          <Box
            key={interest.id}
            sx={{
              ...styles.interest,
              ...(isSelected && styles.selected),
            }}
            onClick={() => toggleInterest(interest.id)}
          >
            <Typography>{interest.title}</Typography>

            <Image
              src={interest.icon_url}
              alt={interest.title}
              width={20}
              height={20}
              style={styles.image as CSSProperties}
            />
          </Box>
        );
      })}
    </Box>
  );
};
