import React, { Component } from "react";
import Countdown from "react-countdown";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../Contexts/Authentication";
import ReactModal from "react-modal";

import "./Soal.css";

import PilihanGanda from "../Components/PilihanGanda";
import PilihanSoal from "../Components/PilihanSoal";
import TopBar from "../Components/TopBar";

const Time = (props) => {
  return (
    <Countdown
      onComplete={() => {
        props.history.push("/logout");
        props.hitungNilai();
      }}
      date={Date.now() + 500000}
    ></Countdown>
  );
};

class Soal extends Component {
  static contextType = AuthContext;

  state = {
    customFont: "pilihan-ganda-custom-font-kecil",
    soal: [
      {
        id: 1,
        pertanyaan: "",
        pilihan: [
          {
            id: 1,
            id_test: 1,
            is_right: 0,
            pilihan: "",
          },
        ],
      },
    ],
    nomor: 0,
    jawaban: [{ no: 0, indexJawaban: null, jawaban: null, ragu: false }],
    showModal: false,
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  changeFont = (size) => {
    if (size === "kecil") {
      this.setState({
        customFont: "pilihan-ganda-custom-font-kecil",
      });
    } else if (size === "sedang") {
      this.setState({
        customFont: "pilihan-ganda-custom-font-sedang",
      });
    } else {
      this.setState({
        customFont: "pilihan-ganda-custom-font-besar",
      });
    }
  };

  fetchSoal = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/alltest`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let x = [];
        result.forEach((data, index) => {
          x.push({
            no: index,
            indexJawaban: null,
            jawaban: null,
            ragu: false,
          });
        });
        this.setState({
          soal: result,
          jawaban: x,
        });
      })
      .catch((error) => console.log("error", error));
  };

  soalBerikutnya = () => {
    this.setState({
      nomor: this.state.nomor + 1,
    });
  };

  soalSebelumnya = () => {
    this.setState({
      nomor: this.state.nomor - 1,
    });
  };

  onClickJawaban = (index, status) => {
    let x = this.state.jawaban;
    x[this.state.nomor].jawaban = status;
    x[this.state.nomor].indexJawaban = index;
    this.setState({
      jawaban: x,
    });
  };

  onClickRagu = () => {
    let x = this.state.jawaban;
    x[this.state.nomor].ragu = !x[this.state.nomor].ragu;
    this.setState({
      jawaban: x,
    });
  };

  navNumber = (index) => {
    this.setState({
      nomor: index,
    });
  };

  hitungNilai = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let x = 0;

    this.state.jawaban.forEach((data) => {
      if (data.jawaban === true) {
        x++;
      }
    });

    x = (x / this.state.jawaban.length) * 100;

    const raw = JSON.stringify({
      id_kelas: this.context.data.id_kelas,
      jenis_kelamin: this.context.data.jenis_kelamin,
      nama: this.context.data.nama,
      nis: this.context.data.nis,
      password: this.context.data.password,
      nilai_pretest: x,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/siswa/${this.context.data.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push("/logout");
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchSoal();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-md-8 soal-box-outer">
              <div className="soal-box-inner">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-0">
                      SOAL NO
                      <span className="soal-no"></span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="row text-center pt-2 m-0">
                      <div className="col-md-6 soal-sisa-waktu">Sisa Waktu</div>
                      <div className="col-md-6 soal-waktu">
                        <Time
                          hitungNilai={this.hitungNilai}
                          history={this.props.history}
                        ></Time>
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

                {this.state.soal !== null ? (
                  <PilihanGanda
                    jawaban={this.state.jawaban[this.state.nomor]}
                    onClickJawaban={this.onClickJawaban}
                    customFont={this.state.customFont}
                    soal={this.state.soal[this.state.nomor]}
                  ></PilihanGanda>
                ) : (
                  ""
                )}
              </div>
              <div className="soal-box-inner mt-3">
                <div className="row text-center justify-content-center">
                  {this.state.nomor !== 0 ? (
                    <button
                      onClick={this.soalSebelumnya}
                      className="btn text-uppercase btn-secondary mr-2"
                    >
                      <i className="fas fa-arrow-left mr-3"></i>Soal Sebelumnya
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={this.onClickRagu}
                    className="btn text-uppercase btn-warning mr-2 text-white"
                  >
                    Ragu Ragu
                  </button>
                  {this.state.nomor !== this.state.soal.length - 1 ? (
                    <button
                      onClick={this.soalBerikutnya}
                      className="btn text-uppercase btn-primary"
                    >
                      Soal Berikutnya
                      <i className="fas fa-arrow-right ml-3"></i>
                    </button>
                  ) : (
                    ""
                  )}

                  {this.state.nomor === this.state.soal.length - 1 ? (
                    <button
                      onClick={this.handleOpenModal}
                      className="btn text-uppercase btn-danger ml-2"
                    >
                      Selesai
                    </button>
                  ) : (
                    ""
                  )}

                  <ReactModal
                    isOpen={this.state.showModal}
                    className="kelas-modal"
                    overlayClassName="kelas-modal-overlay"
                  >
                    <h5 className="text-center">Konfirmasi Selesai</h5>
                    <hr />
                    <p className="text-center">
                      Apakah anda yakin ingin mengakhiri tes? <br></br>
                      Anda tidak akan bisa kembali ke soal jika sudah menekan
                      tombol selesai
                    </p>

                    <div className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.hitungNilai();
                        }}
                      >
                        Selesai
                      </button>
                      <button
                        className="btn btn-outline-warning ml-3 cancel-button"
                        onClick={this.handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </ReactModal>
                </div>
              </div>
            </div>
            <div className="col-md-4 soal-box-outer">
              <div className="soal-box-inner">
                <PilihanSoal
                  navNumber={this.navNumber}
                  jawaban={this.state.jawaban}
                ></PilihanSoal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Soal);
