import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";

import "./Logout.css";

import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";

export default class Logout extends Component {
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
