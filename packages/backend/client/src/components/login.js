import React, { Component } from 'react';
import { API_URL } from '../utilities/helper';
import { withStyles } from '@material-ui/core/styles';
import { LoginStyle } from '../styles/login.jss';
import { Button, TextField, Paper, Typography, Link } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: "",
                password: "",
                accountType: "staff"
            },
            error: false,
            logging_in: false
        }
    }

    handleOnChange($event) {
        const newState = Object.assign({}, this.state);
        const { name, value } = $event.target;

        if (name === "username") {
            newState.credentials.username = value.trim();
        } else if (name === "password") {
            newState.credentials.password = value.trim();
        } else if (name === "accountType") {
            newState.credentials.accountType = value;
        } else {
            return;
        }

        this.setState(newState);
        console.log(this.state.credentials);
    }


    handleLogin() {
        //Safety Checks
        if (this.state.credentials.username.trim() === "" || this.state.credentials.password.trim() === "") {
            alert("Please provide your details!!");
            return;
        }

        fetch(`${API_URL}/api/auth`, {
            method: 'POST',
            body: JSON.stringify(this.state.credentials),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.text())
            .then(data => alert(data))
            .catch(err => alert("Failed to make connection now!"));
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.loginContainer} elevation={5}>
                {/* Put another container here... */}
                <div className={classes.leveler}>
                    <Typography variant="h4">AUI CMS</Typography>
                    <TextField error={this.state.error}
                        className={classes.inputBox}
                        variant="outlined"
                        name="username"
                        fullWidth
                        value={this.state.credentials.username}
                        onChange={(event) => this.handleOnChange(event)}
                        label="username"></TextField>
                    <TextField error={this.state.error}
                        type="password"
                        className={classes.inputBox}
                        variant="outlined"
                        fullWidth
                        name="password"
                        value={this.state.credentials.password}
                        onChange={(event) => this.handleOnChange(event)}
                        label="password"></TextField>
                    <Button disabled={this.state.logging_in}
                        onClick={() => this.handleLogin()}
                        className={classes.loginBtn}
                        variant="contained"
                        size="large">
                        {this.state.logging_in ? <CircularProgress color="primary" /> : "Login"}
                    </Button>
                    <p style={{ margin: "auto", alignSelf: "center", fontSize: "15px", cursor: "pointer" }}> Don't have an account?
                     {" "}    <Link to="/register">Register</Link>
                    </p>
                </div>
            </Paper>
        )
    }
}

export default withStyles(LoginStyle)(Login);