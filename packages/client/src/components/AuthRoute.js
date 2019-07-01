import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { VerifyLoginStaus } from "../utilities/helper";

class AuthRoute extends Component {
	render() {
		if (!VerifyLoginStaus()) return <Redirect to="/login" />;
		return <Route {...this.props} />;
	}
}

export default AuthRoute;
