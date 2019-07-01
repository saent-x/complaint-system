import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import profileImg from "../assets/img/icons/common/profile.svg";
import DropdownMenu from "./DropdownMenu";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-light d-none d-md-block"
          expand="md"
          id="navbar-main"
        >
          <Container fluid>
            <h4
              className="mb-0 text-dark text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </h4>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={profileImg} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span
                        style={{ color: "black" }}
                        className="mb-0 text-sm font-weight-bold"
                      >
                        Adeola Adeniji
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu />
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
