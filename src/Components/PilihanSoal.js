import React, { Component } from "react";

import "./PilihanSoal.css";

class Pilihan extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.changeSoal(this.props.nomor.no);
        }}
        className={`pilihan-soal-box-outer ${
          this.props.nomor.ragu
            ? "bg-warning"
            : this.props.nomor.jawaban !== null
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
  changeSoal = (index) => {
    this.props.navNumber(index);
  };

  render() {
    return (
      <div className="row justify-content-center">
        {this.props.jawaban.map((nomor) => {
          return (
            <Pilihan
              changeSoal={this.changeSoal}
              key={nomor.no}
              nomor={nomor}
            ></Pilihan>
          );
        })}
      </div>
    );
  }
}
