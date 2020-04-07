import React, { Component } from "react";
import Countdown from "react-countdown";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./Soal.css";

import PilihanGanda from "../Components/PilihanGanda";
import PilihanSoal from "../Components/PilihanSoal";
import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";

const Time = (props) => {
  return (
    <Countdown
      onComplete={() => {
        console.log(props.history.push("/logout"));
      }}
      date={Date.now() + 500000}
    ></Countdown>
  );
};

class ModalEnd extends Component {
  state = {
    check: false,
  };

  onCheckCheckBox = () => {
    this.setState({
      check: !this.state.check,
    });
  };

  falseCheckBox = () => {
    this.setState({
      check: false,
    });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-secondary" closeButton>
          <Modal.Title
            className="text-light"
            id="contained-modal-title-vcenter"
          >
            Konfirmasi Tes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">
            Apakah anda yakin ingin mengakhiri tes? <br></br>
            Anda tidak akan bisa kembali ke soal jika sudah menekan tombol
            selesai
          </h5>
          <input
            className="text-center"
            id="konfirmasiTes"
            type="checkbox"
            onChange={this.onCheckCheckBox}
          />
          <label className="form-check-label" htmlFor="konfirmasiTes">
            Centang, kemudian tekan tombol selesai. Jika anda yakin untuk
            mengakhiri tes.
          </label>
        </Modal.Body>
        <Modal.Footer>
          <NavLink href="/logout">
            <Button
              disabled={this.state.check ? false : true}
              className="btn btn-success"
              onClick={this.props.onHide}
            >
              Selesai
            </Button>
          </NavLink>

          <Button
            className="btn btn-danger"
            onClick={() => {
              this.props.onHide();
              this.falseCheckBox();
            }}
          >
            Tidak
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Soal extends Component {
  state = {
    customFont: "pilihan-ganda-custom-font-kecil",
    modalShow: false,
    setModalShow: false,
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
  };

  setModalShow = (x) => {
    this.setState({
      modalShow: x,
    });
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

    fetch("http://127.0.0.1:5000/alltest", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          soal: result,
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
                        <Time history={this.props.history}></Time>
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

                  {/* <button className="btn text-uppercase btn-warning mr-2">
                    <input type="checkbox"></input>Ragu Ragu
                  </button> */}
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

                  <ButtonToolbar>
                    {this.state.nomor === this.state.soal.length - 1 ? (
                      <Button
                        className="btn text-uppercase btn-warning text-white"
                        variant="primary"
                        onClick={() => this.setModalShow(true)}
                      >
                        Tes Selesai
                      </Button>
                    ) : (
                      ""
                    )}

                    <ModalEnd
                      show={this.state.modalShow}
                      onHide={() => this.setModalShow(false)}
                    />
                  </ButtonToolbar>
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

export default withRouter(Soal);
