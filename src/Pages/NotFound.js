import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! Nothing was found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <button
            className="btn btn-outline-warning"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Back to Login Page
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(NotFound);
