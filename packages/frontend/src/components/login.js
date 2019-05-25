import React, { Component } from 'react';
import { API_URL } from '../utilities/helper';
import '../styles/login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: "",
                password: "",
                accountType: "staff"
            }
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
        return (
            <div className="login-container">
                <h1>Login</h1>
                <input onChange={(event) => this.handleOnChange(event)} name="username" type="text" placeholder="username"></input>
                <input onChange={(event) => this.handleOnChange(event)} name="password" type="password" placeholder="password"></input>
                <br></br>
                <button onClick={() => this.handleLogin()}>Login</button>
            </div>
        )
    }
}

export default Login;