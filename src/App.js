import "./App.css";

import { ProtectedRoute } from "./Components/ProtectedRoute";

import Authentication from "./Contexts/Authentication";

import Login from "./Pages/Login";
import Soal from "./Pages/Soal";
import Token from "./Pages/Token";
import Konfirmasi from "./Pages/Konfirmasi";
import Logout from "./Pages/Logout";
import DaftarUjian from "./Pages/DaftarUjian";
import NilaiKamu from "./Pages/NilaiKamu";
import DeskripsiSoal from "./Pages/DeskripsiSoal";
import NotFound from "./Pages/NotFound";
import Ujian from "./Pages/Ujian";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Authentication>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <ProtectedRoute path="/soal" component={Soal}></ProtectedRoute>
          <ProtectedRoute path="/token" component={Token}></ProtectedRoute>
          <ProtectedRoute
            path="/konfirmasi"
            component={Konfirmasi}
          ></ProtectedRoute>
          <Route path="/logout" component={Logout}></Route>
          <ProtectedRoute
            path="/daftar-ujian"
            component={DaftarUjian}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/nilai-kamu"
            component={NilaiKamu}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/deskripsi-soal"
            component={DeskripsiSoal}
          ></ProtectedRoute>
          <ProtectedRoute path="/ujian" component={Ujian}></ProtectedRoute>
          <Route path="*" component={() => <NotFound />} />
        </Switch>
      </Authentication>
    </Router>
  );
}
