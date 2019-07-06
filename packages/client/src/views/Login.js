import React, { Component } from "react";
import { API_URL } from "../utilities/helper";
import { withStyles } from "@material-ui/core/styles";
import { LoginStyle } from "../styles/login.jss";
import { Button, TextField, Paper, Typography, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { handleError, StoreToken, $axios } from "../utilities/helper";
import Logo from "assets/img/aui_logo.png";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			credentials: {
				EmailAddress: "",
				Password: ""
			},
			error: false,
			logging_in: false,
			accountType: "student"
		};
	}

	handleOnChange($event) {
		const newState = { ...this.state };
		const { name, value } = $event.target;

		if (newState.error) newState.error = false;

		if (name === "email") {
			newState.credentials.EmailAddress = value.trim();
		} else if (name === "password") {
			newState.credentials.Password = value.trim();
		} else if (name === "accountType") {
			newState.accountType = value;
		} else {
			return;
		}

		this.setState(newState);
	}

	handleLogin() {
		if (!this.state.logging_in) {
			this.setState({ logging_in: true });
			if (this.state.credentials.EmailAddress.trim() === "" || this.state.credentials.Password.trim() === "") {
				this.setState({ logging_in: false, error: true });
				alert("Please provide your details!!");
				return;
			}

			$axios()
				.post(`/api/auth?type=${this.state.accountType}`, this.state.credentials)
				.then(res => {
					this.setState({ logging_in: false });
					//Store the token
					StoreToken(res.data.token);
					this.props.history.push("/portal/index");
				})
				.catch(error => {
					this.setState({ error: true, logging_in: false });
					handleError(error);
				});
		}
	}

	handleSelectChange(event) {
		let obj = { ...this.state };
		obj.accountType = event.target.value;
		this.setState(obj);
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.loginContainer} elevation={5}>
				<div style={{ textAlign: "center", marginBottom: "10px", marginTop: "10px" }}>
					<img src={Logo} height="70px" width="100px" />
					<h3 style={{ marginTop: "15px" }}>AUI Complaint System</h3>
				</div>

				<form className={classes.leveler}>
					<FormControl required>
						<TextField
							required
							variant="outlined"
							error={this.state.error}
							className={classes.inputBox}
							name="email"
							fullWidth
							value={this.state.credentials.EmailAddress}
							onChange={event => this.handleOnChange(event)}
							label="email"
						/>
					</FormControl>

					<FormControl>
						<TextField
							required
							error={this.state.error}
							variant="outlined"
							type="password"
							className={classes.inputBox}
							fullWidth
							name="password"
							value={this.state.credentials.Password}
							onChange={event => this.handleOnChange(event)}
							label="password"
						/>
					</FormControl>
					<br />
					<FormControl>
						<InputLabel>Account Type</InputLabel>
						<Select
							className={classes.typeSelect}
							onChange={event => this.handleSelectChange(event)}
							value={this.state.accountType}
						>
							<MenuItem value="student">Student</MenuItem>
							<MenuItem value="staff">Staff</MenuItem>
						</Select>
					</FormControl>
					<Button
						disabled={this.state.logging_in}
						onClick={() => this.handleLogin()}
						className={classes.loginBtn}
						variant="contained"
						size="large"
					>
						{this.state.logging_in ? <CircularProgress color="primary" /> : "Login"}
					</Button>
					<p
						style={{
							fontSize: "15px",
							cursor: "pointer",
							marginTop: "5px"
						}}
					>
						{" "}
						Don't have an account? <Link to="/register">Register</Link>
					</p>
				</form>
			</Paper>
		);
	}
}

export default withStyles(LoginStyle)(Login);
