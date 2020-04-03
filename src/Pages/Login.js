import React, { Component } from "react";

import { AuthContext } from "../Contexts/Authentication";
import { withRouter } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  static contextType = AuthContext;

  state = {
    inputNis: "",
    inputPassword: "",
    error: false,
    errorMsg: ""
  };

  handleChangeNis = event => {
    this.setState({
      inputNis: event.target.value
    });
  };

  handleChangePassword = event => {
    this.setState({
      inputPassword: event.target.value
    });
  };

  // Method untuk handle user ketika menekan tombol enter pada form login
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleButtonLogin();
    }
  };

  // Method untuk memunculkan warning error pada saat login
  toggleError = msg => {
    this.setState({
      error: true,
      errorMsg: msg
    });
  };

  handleButtonLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      nis: this.state.inputNis,
      password: this.state.inputPassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/auth/siswa", requestOptions)
      .then(response => response.json())
      .then(data => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.toggleError("Wrong Username / Password");
        } else {
          this.context.changeAuthToTrue(data);
          this.props.history.push("/token");
        }
      })
      .catch(error => console.log("error", error));
  };

  // Method untuk mengecek apakah inputan user kosong
  checkInput = () => {
    if (this.state.inputPassword === "" || this.state.inputNis === "") {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="container login-page-form">
        <div className="col-md-4 mx-auto">
          <form className="card login-page-card" action="#">
            <div className="card-title text-left login-page-title-text bg-success">
              User Login
            </div>
            <div className="card-body">
              <div className="card-text">
                <label htmlFor="nis" className="login-page-label">
                  NIS
                </label>
                <div className="input-group login-page-form-input">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="nis"
                    placeholder="NIS"
                    value={this.state.inputNis}
                    onChange={this.handleChangeNis}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <label htmlFor="password" className="login-page-label">
                  Password
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.inputPassword}
                    onChange={this.handleChangePassword}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>

                {this.state.error ? (
                  <div className="mt-3 text-danger">{this.state.errorMsg}</div>
                ) : (
                  ""
                )}

                <button
                  onClick={event => {
                    event.preventDefault();
                    if (this.checkInput() === true) {
                      this.handleButtonLogin(this.props);
                    } else {
                      this.toggleError("Fill NIS & Password");
                    }
                  }}
                  className="btn form-control mt-4 btn-success"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
