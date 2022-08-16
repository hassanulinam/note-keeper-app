import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeState } from "../context/ThemeContextProvider";

const ToastAlert = () => {
  const { notifyToast, setNotifyToast } = ThemeState();

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotifyToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={notifyToast.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={notifyToast.type}
      >
        {notifyToast.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastAlert;
