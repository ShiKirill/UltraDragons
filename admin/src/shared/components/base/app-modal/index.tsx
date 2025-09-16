import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      transitionDuration={{ exit: 0 }}
      sx={styles.modal}
    >
      <DialogTitle sx={{ m: 0, p: "24px" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
      </DialogTitle>

      <IconButton sx={styles.closeIcon} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};
