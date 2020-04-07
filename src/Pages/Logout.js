import React, { Component } from "react";
import Countdown from "react-countdown";
import { Button, Container } from "react-bootstrap";
import { AuthContext } from "../Contexts/Authentication";

import "./Logout.css";

import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";
import { withRouter } from "react-router-dom";

const Time = (props) => {
  return (
    <Countdown
      onComplete={() => {
        props.history.push("/");
      }}
      date={Date.now() + 5000}
    ></Countdown>
  );
};

class Logout extends Component {
  static contextType = AuthContext;

  logout = () => {
    this.context.changeAuthToFalse();
  };

  componentDidMount() {
    this.logout();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <Container>
          <div className="logout-box">
            <div className="logout-title bg-secondary text-light">
              Konfirmasi Tes
            </div>
            <div className="logout-content">
              Terimakasih telah berpartisipasi dalam tes ini. <br />
              Silahkan klik tombol <strong>LOGOUT</strong> untuk mengakhiri tes.
            </div>
            <hr />
            <div className="p-3 text-center">
              Akan Log Out Otomatis dalam
              <hr />
              <h3>
                <Time history={this.props.history}></Time>
              </h3>
            </div>
            <div className="text-center">
              <NavLink href="/">
                <Button className="text-uppercase btn btn-success logout-button">
                  Logout
                </Button>
              </NavLink>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Logout);
