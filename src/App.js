import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import WorldPage from "./components/WorldPage";

import ThemeProvider from "./components/styledComponents/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={WorldPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
