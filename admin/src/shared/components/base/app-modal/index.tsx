import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import { styles } from "./styles";

interface AppModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: VoidFunction;
}

export const AppModal = ({
  title,
  children,
  isOpen,
  onClose,
}: AppModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.wrapper}>
        <IconButton sx={styles.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>

        {children}
      </Box>
    </Modal>
  );
};
