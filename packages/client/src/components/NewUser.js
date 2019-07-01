import React, { Component } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter
} from "reactstrap";

export default class NewUser extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    type: "user"
  };

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleAccountTypeChange = e => {
    const pick = e.target.value;
    switch (pick) {
      case "Local User":
        this.setState({ type: "local-user" });
        break;
      case "Local Admin":
        this.setState({ type: "local-admin" });
        break;
      case "Directory User":
        this.setState({ type: "user" });
        break;
      case "Directory Admin":
        this.setState({ type: "admin" });
        break;
      default:
        this.setState({ type: "local-user" });
        break;
    }
  };

  validate = () => {
    const isLocal = this.state.type.indexOf("local") !== -1;
    if (!this.state.username) return alert("Username is required");
    if (isLocal && !this.state.password) return alert("Password is required");

    const passwordMatch = isLocal
      ? this.state.password === this.state.password2
      : true;

    if (!passwordMatch) return alert("Passwords do not match please try again");

    this.props.submit(
      this.state.username,
      this.state.type,
      this.state.password
    );
  };

  render() {
    /* optional password field that should only be rendered when creating a local user */
    const passwordField =
      this.state.type.indexOf("local") !== -1 ? (
        <>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password2">Retype password</Label>
            <Input
              type="password"
              name="password2"
              id="password2"
              placeholder="Retype password"
              value={this.state.password2}
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </>
      ) : null;

    return (
      <Modal isOpen={this.props.open}>
        <ModalHeader>Create New User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="account-type">Role</Label>
              <Input
                type="select"
                name="account-type"
                id="account-type"
                onChange={this.handleAccountTypeChange}
              >
                <option>Directory User</option>
                <option>Directory Admin</option>
                <option>Local User</option>
                <option>Local Admin</option>
              </Input>
            </FormGroup>
            {passwordField}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.validate}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={this.props.close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
