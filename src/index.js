import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import "./index.css";
import App from "./App";

ReactModal.setAppElement("#root");
ReactDOM.render(<App />, document.getElementById("root"));
