import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { ErrorSnackbarProps } from "../../types/ErrorSnackbarProps";

export default function ErrorSnackbar({
  open,
  message,
  onClose,
}: ErrorSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}
