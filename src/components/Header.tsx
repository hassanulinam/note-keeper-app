import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ThemeState } from "../context/CustomThemeProvider";
import { IconButton } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

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

  const { toggleTheme, isDark } = ThemeState();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Note Keeper
          </Typography>
          <IconButton className={classes.themeButton} onClick={toggleTheme}>
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button variant="outlined">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
