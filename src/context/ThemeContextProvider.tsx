import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { useContext } from "react";
import { createContext, useState } from "react";
import { ChildProp, THEME_CONTEXT, ToastObj } from "../config/customTypes";

const ThemeContext = createContext<THEME_CONTEXT>({
  toggleTheme: () => {},
  isDark: true,
  notifyToast: { open: false, message: "", type: "info" },
  setNotifyToast: () => {},
});

const ThemeContextProvider = ({ children }: ChildProp) => {
  const [isDark, setIsDark] = useState(true);
  const [notifyToast, setNotifyToast] = useState<ToastObj>({
    open: false,
    message: "",
    type: "success",
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    console.log("Toggling theme....");
  };

  const theme = createTheme({ palette: { type: isDark ? "dark" : "light" } });

  return (
    <ThemeContext.Provider
      value={{ toggleTheme, isDark, notifyToast, setNotifyToast }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const ThemeState = () => useContext(ThemeContext);
