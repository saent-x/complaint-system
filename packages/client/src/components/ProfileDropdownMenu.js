import React from "react";
import { DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteWebToken } from "../util";
import { withRouter } from "react-router-dom";

function handleLogout(e, props) {
  e.preventDefault();
  /* delete the saved webtoken */
  deleteWebToken();
  props.history.push("/");
}

function ProfileDropdownMenu(props) {
  return (
    <div style={{ zIndex: 1000 }}>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem className="noti-title" header tag="div">
          <h6 className="text-overflow m-0">Welcome!</h6>
        </DropdownItem>
        <DropdownItem to="/admin/user-profile" tag={Link}>
          <i className="ni ni-settings-gear-65" />
          <span>Settings</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem href="#" onClick={e => handleLogout(e, props)}>
          <i className="ni ni-user-run" />
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
}

export default withRouter(ProfileDropdownMenu);
