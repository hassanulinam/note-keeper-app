import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ThemeState } from "../context/ThemeContextProvider";
import { IconButton } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebaseApp";
import { UserState } from "../context/UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    themeButton: {
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

  const { toggleTheme, isDark } = ThemeState();
  const { user } = UserState();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("SUCCESS TOAST: login success");
      })
      .catch((err) => {
        console.log("Signin Error", err);
      });
  };

  const onLogout = () => {
    signOut(auth);
    // Toast : logout success !
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Note Keeper
          </Typography>
          <IconButton className={classes.themeButton} onClick={toggleTheme}>
            {isDark ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          {user ? (
            <Button variant="outlined" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outlined" onClick={signInWithGoogle}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
