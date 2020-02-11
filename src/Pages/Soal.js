import React, { Component } from "react";
import Countdown from "react-countdown";

import "./Soal.css";

import PilihanGanda from "../Components/PilihanGanda";
import PilihanSoal from "../Components/PilihanSoal";

const SOAL = [
  {
    no: 1,
    soal: "Hasil dari 12 + 2 = ... ",
    jawaban: [
      {
        id: 1,
        isi: "11"
      },
      {
        id: 2,
        isi: "12"
      },
      {
        id: 3,
        isi: "13"
      },
      {
        id: 4,
        isi: "14"
      },
      {
        id: 5,
        isi: "16"
      }
    ]
  }
];

class Time extends Component {
  render() {
    return <Countdown date={Date.now() + 500000}></Countdown>;
  }
}

export default class Soal extends Component {
  state = { customFont: "pilihan-ganda-custom-font-kecil" };

  changeFont = size => {
    if (size === "kecil") {
      this.setState({
        customFont: "pilihan-ganda-custom-font-kecil"
      });
    } else if (size === "sedang") {
      this.setState({
        customFont: "pilihan-ganda-custom-font-sedang"
      });
    } else {
      this.setState({
        customFont: "pilihan-ganda-custom-font-besar"
      });
    }
  };

  render() {
    return (
      <div>
        <div className="soal-top-bar"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 soal-box-outer">
              <div className="soal-box-inner">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-0">
                      SOAL NO
                      <span className="soal-no">{SOAL[0].no}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="row text-center pt-2 m-0">
                      <div className="col-md-6 soal-sisa-waktu">Sisa Waktu</div>
                      <div className="col-md-6 soal-waktu">
                        <Time></Time>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="soal-ukuran">
                  Ukuran font soal:
                  <span
                    onClick={() => this.changeFont("kecil")}
                    className="soal-ukuran-parent soal-ukuran-kecil"
                  >
                    {this.state.customFont ===
                    "pilihan-ganda-custom-font-kecil" ? (
                      <u>A</u>
                    ) : (
                      <span>A</span>
                    )}
                  </span>
                  <span
                    onClick={() => this.changeFont("sedang")}
                    className="soal-ukuran-parent soal-ukuran-sedang"
                  >
                    {this.state.customFont ===
                    "pilihan-ganda-custom-font-sedang" ? (
                      <u>A</u>
                    ) : (
                      <span>A</span>
                    )}
                  </span>
                  <span
                    onClick={() => this.changeFont("besar")}
                    className="soal-ukuran-parent soal-ukuran-besar"
                  >
                    {this.state.customFont ===
                    "pilihan-ganda-custom-font-besar" ? (
                      <u>A</u>
                    ) : (
                      <span>A</span>
                    )}
                  </span>
                </p>
                <PilihanGanda
                  customFont={this.state.customFont}
                  soal={SOAL[0]}
                ></PilihanGanda>
              </div>
              <div className="soal-box-inner mt-3">
                <div className="row text-center justify-content-center">
                  <button className="btn text-uppercase btn-secondary mr-2">
                    <i className="fas fa-arrow-left mr-3"></i>Soal Sebelumnya
                  </button>
                  <button className="btn text-uppercase btn-warning mr-2">
                    <input type="checkbox"></input>Ragu Ragu
                  </button>
                  <button className="btn text-uppercase btn-primary">
                    Soal Berikutnya<i className="fas fa-arrow-right ml-3"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 soal-box-outer">
              <div className="soal-box-inner">
                <PilihanSoal></PilihanSoal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
