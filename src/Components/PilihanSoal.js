import React, { Component } from "react";

import "./PilihanSoal.css";

const NUMBER = [
  {
    no: 1,
    done: true,
    ragu: false
  },
  {
    no: 2,
    done: true,
    ragu: false
  },
  {
    no: 3,
    done: true,
    ragu: false
  },
  {
    no: 4,
    done: true,
    ragu: false
  },
  {
    no: 5,
    done: true,
    ragu: false
  },
  {
    no: 6,
    done: true,
    ragu: false
  },
  {
    no: 7,
    done: true,
    ragu: false
  },
  {
    no: 8,
    done: true,
    ragu: false
  },
  {
    no: 9,
    done: true,
    ragu: false
  },
  {
    no: 10,
    done: false,
    ragu: false
  },
  {
    no: 11,
    done: false,
    ragu: true
  }
];

class Pilihan extends Component {
  render() {
    return (
      <div
        className={`pilihan-soal-box-outer ${
          this.props.nomor.ragu
            ? "bg-warning"
            : this.props.nomor.done
            ? "bg-success"
            : ""
        }`}
      >
        {this.props.nomor.no}
      </div>
    );
  }
}

export default class PilihanSoal extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        {NUMBER.map(nomor => {
          return <Pilihan key={nomor.no} nomor={nomor}></Pilihan>;
        })}
      </div>
    );
  }
}
