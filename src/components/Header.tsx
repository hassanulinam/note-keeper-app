import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ThemeState } from "../context/ThemeContextProvider";
import { Avatar, IconButton, Tooltip, Zoom } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebaseApp";
import { UserState } from "../context/UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "sticky",
      top: 0,
      zIndex: 5,
    },
    rightMargin: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const googleProvider = new GoogleAuthProvider();

  const { toggleTheme, isDark, setNotifyToast } = ThemeState();
  const { user } = UserState();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setNotifyToast({
          open: true,
          message: "Sign-in successful!",
          type: "success",
        });
      })
      .catch((err) => {
        setNotifyToast({
          open: true,
          message: "Sign-in: Error occured",
          type: "error",
        });
      });
  };

  const onLogout = () => {
    signOut(auth);
    setNotifyToast({
      open: true,
      message: "sign out successful",
      type: "warning",
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Note Keeper
          </Typography>
          {user && (
            <Tooltip title={user?.displayName || ""} TransitionComponent={Zoom}>
              <Avatar
                src={user?.photoURL as string}
                className={classes.rightMargin}
              />
            </Tooltip>
          )}
          <Tooltip title="switch theme" TransitionComponent={Zoom}>
            <IconButton className={classes.rightMargin} onClick={toggleTheme}>
              {isDark ? (
                <Brightness4Icon fontSize="large" />
              ) : (
                <Brightness7Icon fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
          {user ? (
            <Button variant="outlined" color="secondary" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Tooltip title="sign in with Google">
              <Button variant="outlined" onClick={signInWithGoogle}>
                Login
              </Button>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
