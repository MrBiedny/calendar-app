import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ErrorSnackbarProps } from "../../types/ErrorSnackbarProps";

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  open,
  message,
  onClose,
}) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity="error">
      {message}
    </Alert>
  </Snackbar>
);

export default ErrorSnackbar;
