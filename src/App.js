import React from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import WorldPage from "./components/WorldPage";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "'-apple-system','BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"
  },
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <Switch>
            <Route path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={WorldPage} />
          </Switch>
        </div>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
