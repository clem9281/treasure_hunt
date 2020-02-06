import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  teal,
  blue,
  deepPurple,
  green,
  yellow,
  red
} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', 'sans-serif'"
  },
  palette: {
    type: "dark",
    primary: teal,
    secondary: {
      main: deepPurple[800],
      light: deepPurple[700],
      dark: deepPurple[900]
    },
    success: {
      main: green[700],
      light: green[600],
      dark: green[800]
    },
    warning: {
      main: yellow[800],
      light: yellow[700],
      dark: yellow[900]
    },
    error: red,
    info: blue
  },
  overrides: {
    MuiCard: {
      root: {
        overflowY: "auto",
        // marginBottom: "2rem",
        height: "100%"
      }
    },
    MuiContainer: {
      root: {
        // maxHeight: "100vh"
      }
    },
    MuiCardHeader: {
      root: {
        width: "max-content",
        margin: 0,
        padding: "0.5rem"
      }
    }
  }
});

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>{children}</CssBaseline>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
