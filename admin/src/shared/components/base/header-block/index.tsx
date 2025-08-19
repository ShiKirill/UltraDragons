import { Box, Button, Typography } from "@mui/material";

import { styles } from "./styles";

interface HeaderBlockProps {
  title: string;
  description?: string;
  actions?: {
    label: string;
    onClick: VoidFunction;
  }[];
}

export const HeaderBlock = ({
  title,
  description,
  actions,
}: HeaderBlockProps) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.header}>
        <Typography variant="h5">{title}</Typography>

        {actions && (
          <Box>
            {actions.map((action) => (
              <Button
                key={action.label}
                variant="outlined"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {description && <Typography variant="body1">{description}</Typography>}
    </Box>
  );
};
