import React, { Component } from "react";
import NavLink from "../Components/NavLink";
import "./Login.css";
import { Button } from "react-bootstrap";

export default class Login extends Component {
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
                <label htmlFor="username" className="login-page-label">
                  Username
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
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <label htmlFor="username" className="login-page-label">
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
                  />
                </div>

                <div className="login-page-button row justify-content-center">
                  <NavLink href="/token">
                    <Button className="btn btn-success">Login</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
