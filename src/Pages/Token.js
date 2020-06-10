import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import TopBar from "../Components/TopBar";

import { AuthContext } from "../Contexts/Authentication";

import "./Token.css";

const Content = (props) => {
  return (
    <div>
      <div className="token-card-content">
        <div className="card-text token-card-content-label">{props.nama}</div>
        <div className="card-text text-uppercase">{props.content}</div>
      </div>
      <hr />
    </div>
  );
};

class Token extends Component {
  static contextType = AuthContext;

  state = {
    label: [],
    inputToken: "",
    idToken: 1,
    error: false,
    errorMsg: "",
    rejected: false,
    idUjian: "",
    idKelas: "",
    idBankSoal: "",
  };

  componentDidMount() {
    const today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (today.getMonth() + 1 < 10) {
      date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/ujian/siswa/${this.context.data.id_kelas}/${date}/1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          this.setState({
            rejected: true,
          });
        } else {
          this.setState({
            idUjian: data.id,
            idKelas: data.id_kelas,
            idBankSoal: data.id_bank_soal,
            label: [
              {
                no: 1,
                nama: "Kode NISN",
                content: this.context.data.nis,
              },
              {
                no: 2,
                nama: "Nama Peserta",
                content: this.context.data.nama,
              },
              {
                no: 3,
                nama: "Jenis Kelamin",
                content: this.context.data.jenis_kelamin,
              },
              {
                no: 4,
                nama: "Mata Pelajaran",
                content: data.mata_pelajaran,
              },
            ],
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  onChangeToken = (event) => {
    this.setState({
      inputToken: event.target.value,
    });
  };

  onClickSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ token: this.state.inputToken });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/token/${this.state.idToken}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (
          Object.entries(result).length === 0 &&
          result.constructor === Object
        ) {
          this.toggleError("Token Salah");
        } else {
          this.props.history.push(
            `/konfirmasi?id_ujian=${this.state.idUjian}&id_kelas=${this.state.idKelas}&id_bank_soal=${this.state.idBankSoal}`
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  toggleError = (msg) => {
    this.setState({
      errorMsg: msg,
      error: true,
    });
  };

  render() {
    return (
      <div>
        <TopBar></TopBar>

        <div className="container">
          {this.state.rejected ? (
            <div className="card mt-5 p-3">
              <h3 className="text-center">
                Tidak ada ujian yang sedang berlangsung
              </h3>
              <br />
              <div className="row justify-content-center">
                <div className="col-3">
                  <button
                    onClick={() => {
                      this.context.changeAuthToFalse();
                    }}
                    className="w-100 btn btn-danger"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card mt-5">
              <div className="card-title token-card-title">
                Konfirmasi Data Peserta
              </div>
              {this.state.label.map((data) => {
                return (
                  <Content
                    key={data.no}
                    nama={data.nama}
                    content={data.content}
                  ></Content>
                );
              })}
              <form>
                <div className="token-card-content">
                  <div className="card-text token-card-content-label">
                    Token
                  </div>
                  <div>
                    <input
                      placeholder="Masukan token disini"
                      className="token-input"
                      type="text"
                      id="token"
                      value={this.state.inputToken}
                      onChange={this.onChangeToken}
                    />
                    <button
                      onClick={this.onClickSubmit}
                      className="token-input-submit btn btn-success ml-3"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="mb-3 text-danger">
                    {this.state.error ? this.state.errorMsg : ""}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Token);
