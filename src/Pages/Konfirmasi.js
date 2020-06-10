import React, { Component } from "react";
import { AuthContext } from "../Contexts/Authentication";
import { withRouter } from "react-router-dom";

import TopBar from "../Components/TopBar";

import "./Token.css";
import "./Konfirmasi.css";

class Konfirmasi extends Component {
  static contextType = AuthContext;

  state = {
    id: "",
    mataPelajaran: "",
    tanggal: "",
    waktuSelesai: "",
  };

  fetchUjian = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id_ujian");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/ujian/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          id: result.id,
          mataPelajaran: result.mata_pelajaran,
          tanggal: result.tanggal_tes,
          waktuSelesai: result.waktu_selesai,
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchUjian();
  }

  handleMulai = () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/jawaban/delete-all/1/1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.props.history.push(`/ujian?x=${this.state.id}`);
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="card mt-5">
                <div className="card-title token-card-title">
                  Informasi Ujian
                </div>
                {this.state.mataPelajaran === undefined ? (
                  <div className="d-flex justify-content-center">
                    <h3 className="mb-4">Tidak Ada Ujian</h3>
                  </div>
                ) : (
                  <div>
                    <div className={`token-card-content mb-3`}>
                      <div className="card-text token-card-content-label">
                        Mata Pelajaran
                      </div>
                      <div className="card-text text-uppercase">
                        {this.state.mataPelajaran}
                      </div>
                    </div>
                    <hr />
                    <div className={`token-card-content mb-3`}>
                      <div className="card-text token-card-content-label">
                        Tanggal
                      </div>
                      <div className="card-text text-uppercase">
                        {this.state.tanggal}
                      </div>
                    </div>
                    <hr />
                    <div className={`token-card-content mb-3`}>
                      <div className="card-text token-card-content-label">
                        Waktu Selesai
                      </div>
                      <div className="card-text text-uppercase">
                        {this.state.waktuSelesai}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-5">
              <div className="card mt-5 konfirmasi-righ-box">
                Apabila tidak tampil informasi ujian, Klik tombol Reresh di
                bawah ini. Jangan refresh browser anda
              </div>
              <button
                className="form-control my-2 btn btn-primary"
                onClick={this.fetchUjian}
              >
                REFRESH
              </button>

              <button
                className="form-control btn btn-danger"
                onClick={this.handleMulai}
              >
                MULAI
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Konfirmasi);
