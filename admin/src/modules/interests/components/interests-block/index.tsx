import { useInterestsQuery } from "@/modules/interests/hooks/use-query";
import { AppTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { Box } from "@mui/material";

import { styles } from "./styles";

export const InterestsBlock = () => {
  const { data: interests = [], isLoading } = useInterestsQuery();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock title="User interests" />

      <AppTable data={interests} />
    </Box>
  );
};
