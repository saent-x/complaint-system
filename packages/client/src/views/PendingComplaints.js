import React, { Component } from "react";
import MaterialTable from "material-table";
import _ from "lodash";
import {
  Container,
  Col,
  Row,
  Card,
} from "reactstrap";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import NewUser from "../components/NewUser";
import moment from "moment";

export default class PendingComplaints extends Component {
  state = {
    data: [],
    open: false
  };

  fetchUserData = () => {
    // createInstance()
    //   .get("/users")
    //   .then(res => {
    //     console.log(res.data.data);
    //     this.setState({ data: res.data.data });
    //   })
    //   .catch(error =>
    //     console.log(!!error.response ? error.response.data : error.message)
    //   );
  };

  componentDidMount() {
    // this.fetchUserData();
  }

  handleCreateUser = (username, type, password) => {
    // createInstance()
    //   .post("/users", { username, role: type, password })
    //   .then(res => {
    //     alert(`${username} created successfully!`);
    //     this.setState({ open: false });
    //     setTimeout(this.fetchUserData, 0);
    //   })
    //   .catch(error =>
    //     alert(!!error.response ? error.response.data : error.message)
    //   );
  };

  handleDeleteUser = username => {
    const proceed = window.confirm(`${username} will be deleted. Continue?`);
    if (proceed) {
      // createInstance()
      //   .delete("/users", { data: { username } })
      //   .then(res => {
      //     alert(`${username} has been removed!`);
      //     setTimeout(this.fetchUserData, 0);
      //   })
      //   .catch(error =>
      //     alert(!!error.response ? error.response.data : error.message)
      //   );
    }
  };

  toggleUserStatus = (username, isActive) => {
    const action = `${isActive ? "disabled" : "enabled"}`;
    const proceed = window.confirm(`${username} will be ${action}. Continue?`);
    if (proceed) {
      // createInstance()
      //   .put("/users", { username, active: !isActive })
      //   .then(res => {
      //     alert(`${username} has been ${action}!`);
      //     setTimeout(this.fetchUserData, 0);
      //   })
      //   .catch(error =>
      //     alert(!!error.response ? error.response.data : error.message)
      //   );
    }
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <NewUser
              open={this.state.open}
              submit={this.handleCreateUser}
              close={() => this.setState({ open: false })}
            />
            <Card className="shadow">
              <MaterialTable
                columns={[
                  {
                    title: "USERNAME",
                    field: "username",
                    cellStyle: {
                      padding: "20px"
                    }
                  },
                  {
                    title: "LAST LOGON", field: "lastLogon", type: "string", render: rowData => {
                      return rowData.lastLogon ? moment(rowData.lastLogon).format("MMM Do YYY, h:mm:ss a") : "never";
                    }
                  },
                  { title: "ROLE", field: "role", type: "string" },
                  {
                    title: "STATUS",
                    field: "active",
                    render: rowData => {
                      return rowData.active === true ? "active" : "disabled";
                    }
                  }
                ]}
                data={this.state.data}
                title={
                  <IconButton onClick={() => this.setState({ open: true })}>
                    <AddIcon />
                  </IconButton>
                }
                localization={{
                  header: {
                    actions: "ACTIONS"
                  }
                }}
                options={{
                  columnsButton: true,
                  actionsColumnIndex: -1
                }}
                actions={[
                  {
                    icon: "autorenew",
                    tooltip: "Toggle Active State",
                    onClick: (event, rowData) => {
                      this.toggleUserStatus(rowData.username, rowData.active);
                    },
                    iconProps: {
                      style: {
                        fontSize: 18,
                        color: "black"
                      }
                    }
                  },
                  {
                    icon: "delete",
                    tooltip: "Delete User",
                    onClick: (event, rowData) => {
                      this.handleDeleteUser(rowData.username);
                    },
                    iconProps: {
                      style: {
                        fontSize: 18,
                        color: "black"
                      }
                    }
                  }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
