import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Countdown from "react-countdown";
import MathJax from "react-mathjax";
import { withRouter } from "react-router-dom";

import TopBar from "../Components/TopBar";

import { AuthContext } from "../Contexts/Authentication";

import "./Ujian.css";

class Ujian extends Component {
  static contextType = AuthContext;

  state = {
    soal: {},
    index: 1,
    style: {
      fontSize: "1rem",
    },
    selected: null,
    dataSelected: null,
    status: 0,
    waktu: 0,
    idUjian: "",
    idKelas: "",
    idBankSoal: "",
    jawaban: "",
    indexMudah: 1,
    indexSedang: 0,
    indexSusah: 0,
  };

  addJawban = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let jawabanSoal;
    let analisisSoal = "Sudah benar";
    let keteranganSoal = "Sudah benar";

    if (this.state.dataSelected.is_right === 0) {
      analisisSoal = this.state.dataSelected.analisis;
      keteranganSoal = this.state.dataSelected.keterangan;
    }

    this.state.soal.pilihan.forEach((element) => {
      if (element.is_right === 1) {
        jawabanSoal = element.pilihan;
      }
    });

    const raw = JSON.stringify({
      id_siswa: this.context.data.id,
      id_ujian: this.state.idUjian,
      id_soal: this.state.soal.id,
      jawaban: this.state.dataSelected.pilihan,
      kunci: jawabanSoal,
      analisis: analisisSoal,
      keterangan: keteranganSoal,
      status: this.state.status,
      pertanyaan: this.state.soal.pertanyaan,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/jawaban`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  onClickSelesai = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let jawabanSoal;
    let analisisSoal = "Sudah benar";
    let keteranganSoal = "Sudah benar";

    if (this.state.dataSelected.is_right === 0) {
      analisisSoal = this.state.dataSelected.analisis;
      keteranganSoal = this.state.dataSelected.keterangan;
    }

    this.state.soal.pilihan.forEach((element) => {
      if (element.is_right === 1) {
        jawabanSoal = element.pilihan;
      }
    });

    const raw = JSON.stringify({
      id_siswa: this.context.data.id,
      id_ujian: this.state.idUjian,
      id_soal: this.state.soal.id,
      jawaban: this.state.dataSelected.pilihan,
      kunci: jawabanSoal,
      analisis: analisisSoal,
      keterangan: keteranganSoal,
      status: this.state.status,
      pertanyaan: this.state.soal.pertanyaan,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/jawaban`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push(`/nilai-kamu?id_ujian=${this.state.idUjian}`);
      })
      .catch((error) => console.log("error", error));
  };

  fetchFirstSoal = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idUjian = params.get("id_ujian");
    const idKelas = params.get("id_kelas");
    const idBankSoal = params.get("id_bank_soal");

    fetch(
      `${process.env.REACT_APP_API_URL}/bobot/first-soal/${idKelas}/${idBankSoal}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          `${process.env.REACT_APP_API_URL}/ujian/${idUjian}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            let time = data.waktu_selesai.split(":");
            let firstDate = new Date();
            let secondDate = new Date(
              firstDate.getFullYear(),
              firstDate.getMonth(),
              firstDate.getDate(),
              time[0],
              time[1]
            );

            const diffInMilliseconds = Math.abs(firstDate - secondDate);

            this.setState({
              waktu: diffInMilliseconds,
              idUjian: idUjian,
              idKelas: idKelas,
              idBankSoal: idBankSoal,
              soal: result,
            });
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  getNextSoal = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/bobot/next-soal/${this.state.idKelas}/${this.state.idBankSoal}/${this.state.soal.id}/${this.state.dataSelected.is_right}/${this.state.indexMudah}/${this.state.indexSedang}/${this.state.indexSusah}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.jenis === 0) {
          this.setState({
            soal: result,
            indexMudah: this.state.indexMudah + 1,
            selected: null,
            dataSelected: null,
            status: 0,
            index: this.state.index + 1,
          });
        } else if (result.jenis === 1) {
          this.setState({
            soal: result,
            indexSedang: this.state.indexSedang + 1,
            selected: null,
            dataSelected: null,
            status: 0,
            index: this.state.index + 1,
          });
        } else {
          this.setState({
            soal: result,
            indexSedang: this.state.indexSusah + 1,
            selected: null,
            dataSelected: null,
            status: 0,
            index: this.state.index + 1,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchFirstSoal();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <Container>
          <div className="ujian-box-content d-flex justify-content-between">
            <div>
              Ukuran Font Soal:
              <span
                style={{
                  fontSize: "1rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
              <span
                style={{
                  fontSize: "1.3rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1.3rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
              <span
                style={{
                  fontSize: "1.6rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1.6rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
            </div>
            <div>
              Sisa Waktu:
              <Countdown
                onComplete={() => {
                  this.props.history.push("/logout");
                }}
                date={Date.now() + this.state.waktu}
              ></Countdown>
            </div>
          </div>
          <div style={this.state.style} className="ujian-box-content">
            {this.state.soal.length === 0 ? (
              ""
            ) : (
                <div>
                  <div>
                    <MathJax.Provider>
                      <MathJax.Node inline formula={this.state.soal.pertanyaan} />
                    </MathJax.Provider>
                  </div>
                  <div>
                    {Object.entries(this.state.soal).length === 0 &&
                      this.state.soal.constructor === Object
                      ? ""
                      : this.state.soal.pilihan.map((data) => {
                        return (
                          <div
                            onClick={() => {
                              this.setState({
                                selected: data.id,
                                dataSelected: data,
                                status: data.is_right,
                              });
                            }}
                            key={data.id}
                            className={`d-flex align-items-center mt-3 clickable `}
                          >
                            <div
                              className={`ujian-bullet ${
                                data.id === this.state.selected
                                  ? "selected"
                                  : ""
                                }`}
                            ></div>
                            <MathJax.Provider>
                              <MathJax.Node inline formula={data.pilihan} />
                            </MathJax.Provider>
                          </div>
                        );
                      })}
                  </div>
                  <div className="d-flex justify-content-end">
                    {this.state.index === 25 ? (
                      <button
                        onClick={() => {
                          this.onClickSelesai();
                        }}
                        disabled={this.state.selected === null ? true : false}
                        className="btn btn-danger"
                      >
                        Selesai
                      </button>
                    ) : (
                        <button
                          onClick={() => {
                            this.addJawban();
                            this.getNextSoal();
                          }}
                          disabled={this.state.selected === null ? true : false}
                          className="btn btn-secondary"
                        >
                          Soal Selanjutnya
                        </button>
                      )}
                  </div>
                </div>
              )}
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Ujian);
