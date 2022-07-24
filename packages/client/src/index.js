import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/erevna-dashboard.scss";
import "typeface-roboto";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import AdminLayout from "layouts/Admin";
import Login from "./views/Login";
import FourOhFour from "./components/FourOhFour";
import Registration from "./views/Registration";

const theme = createTheme({
  typography: {
   "fontFamily": "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif",
   "fontSize": 13,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

const App = function() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration}/>
          <AuthRoute
            path="/portal"
            render={props => <AdminLayout {...props} />}
          />
          <Redirect from="/" to="/portal/index" />
          <Route component={FourOhFour} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
