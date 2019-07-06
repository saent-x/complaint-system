import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/AdminNavbar";
import AdminFooter from "components/AdminFooter";
import Sidebar from "components/Sidebar";
import FourOhFour from "../components/FourOhFour";
import routes from "routes.js";
import { GetTokenInfo, } from "../utilities/helper";

class Admin extends React.Component {
  state = {
    portalType: null
  };

  componentDidMount() {
    if(GetTokenInfo())
      this.setState({ portalType: GetTokenInfo().type });
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/portal") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={props => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    const route = GetTokenInfo().type === "student" ? routes.studentportal : routes.staffportal;
    for (let i = 0; i < route.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          route[i].layout + route[i].path
        ) !== -1
      ) {
        return route[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.state.portalType === "student" ? routes.studentportal : routes.staffportal}
          logo={{
            innerLink: "/portal/index",
            imgSrc: require("assets/img/aui_logo.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <div className="pt-3 pt-md-7">
            <Switch>
              {this.state.portalType === "student" ? this.getRoutes(routes.studentportal) : this.getRoutes(routes.staffportal)}
              <Route component={FourOhFour} />
            </Switch>
          </div>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
