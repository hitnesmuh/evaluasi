import "./App.css";

import Login from "./Pages/Login";
import Soal from "./Pages/Soal";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/soal">
          <Soal />
        </Route>
      </Switch>
    </Router>
  );
}
