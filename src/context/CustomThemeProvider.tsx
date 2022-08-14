import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { useContext } from "react";
import { createContext, useState } from "react";

const ThemeContext = createContext({ toggleTheme: () => {}, isDark: true });

type CustomProps = { children: JSX.Element };

const ThemeContextProvider = ({ children }: CustomProps) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    console.log("Toggling theme....");
  };

  const theme = createTheme({ palette: { type: isDark ? "dark" : "light" } });

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const ThemeState = () => useContext(ThemeContext);
