import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Login from "./Pages/Login";
import Soal from "./Pages/Soal";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
      </Switch>
      <Switch>
        <Route path="/soal">
          <Soal></Soal>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
