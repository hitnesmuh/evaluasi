import React, { Component } from "react";
import Countdown from "react-countdown";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";

import "./Soal.css";

import PilihanGanda from "../Components/PilihanGanda";
import PilihanSoal from "../Components/PilihanSoal";
import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";

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

const Time = () => {
  return <Countdown date={Date.now() + 500000}></Countdown>;
};

class ModalEnd extends Component {
  state = {
    check: false
  };

  onCheckCheckBox = () => {
    this.setState({
      check: !this.state.check
    });

    console.log(this.state.check);
  };

  falseCheckBox = () => {
    this.setState({
      check: false
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
          <NavLink href="/daftar-ujian">
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

export default class Soal extends Component {
  state = {
    customFont: "pilihan-ganda-custom-font-kecil",
    modalShow: false,
    setModalShow: false
  };

  setModalShow = x => {
    this.setState({
      modalShow: x
    });
  };

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
        <TopBar></TopBar>
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
                  {/* <button className="btn text-uppercase btn-primary">
                    Soal Berikutnya<i className="fas fa-arrow-right ml-3"></i>
                  </button> */}
                  {/* <button className="btn text-uppercase btn-primary">
                    Tes Selesai<i className="fas fa-arrow-right ml-3"></i>
                  </button> */}
                  <ButtonToolbar>
                    <Button
                      className="btn text-uppercase btn-primary"
                      variant="primary"
                      onClick={() => this.setModalShow(true)}
                    >
                      Tes Selesai
                    </Button>

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
