import "./App.css";

import Login from "./Pages/Login";
import Soal from "./Pages/Soal";
import Token from "./Pages/Token";
import Konfirmasi from "./Pages/Konfirmasi";
import Logout from "./Pages/Logout";
import DaftarUjian from "./Pages/DaftarUjian";
import NilaiKamu from "./Pages/NilaiKamu";
import DeskripsiSoal from "./Pages/DeskripsiSoal";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router basename="/evaluasi">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/soal">
          <Soal />
        </Route>
        <Route path="/token">
          <Token />
        </Route>
        <Route path="/konfirmasi">
          <Konfirmasi />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/daftar-ujian">
          <DaftarUjian />
        </Route>
        <Route path="/nilai-kamu">
          <NilaiKamu />
        </Route>
        <Route path="/deskripsi-soal">
          <DeskripsiSoal />
        </Route>
      </Switch>
    </Router>
  );
}
