import React, { Component } from "react";

import TopBar from "../Components/TopBar";

import "./DaftarUjian.css";
import "./NilaiKamu.css";

import { AuthContext } from "../Contexts/Authentication";
import { withRouter } from "react-router-dom";

class NilaiKamu extends Component {
  static contextType = AuthContext;

  state = {
    kelas: "",
    ujian: "",
    jumlahSoal: "",
    jawabanBenar: "",
    jawabanSalah: "",
    nilai: "",
  };

  fetchKelas = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/kelas/id/${this.context.data.id_kelas}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          kelas: result.nama,
        });
      })
      .catch((error) => console.log("error", error));
  };

  fetchUjian = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idUjian = params.get("id_ujian");

    fetch(`${process.env.REACT_APP_API_URL}/ujian/${idUjian}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ujian: result.mata_pelajaran,
        });
      })
      .catch((error) => console.log("error", error));
  };

  fetchJawaban = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idUjian = params.get("id_ujian");

    fetch(
      `${process.env.REACT_APP_API_URL}/jawaban/siswa/${this.context.data.id}/${idUjian}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let jumlahBenar = 0;
        let jumlahSalah = 0;

        result.forEach((element) => {
          if (element.status === 1) {
            jumlahBenar++;
          } else {
            jumlahSalah++;
          }
        });

        let nilai = (jumlahBenar / result.length) * 100;

        this.setState({
          jumlahSoal: result.length,
          jawabanBenar: jumlahBenar,
          jawabanSalah: jumlahSalah,
          nilai: nilai,
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchKelas();
    this.fetchUjian();
    this.fetchJawaban();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="daftar-ujian-left-card">
                <div className="daftar-ujian-left-title">Nilai Kamu</div>
                <div>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>NIS</td>
                        <td>{this.context.data.nis}</td>
                      </tr>
                      <tr>
                        <td>Nama</td>
                        <td>{this.context.data.nama}</td>
                      </tr>
                      <tr>
                        <td>Kelas</td>
                        <td>{this.state.kelas}</td>
                      </tr>
                      <tr>
                        <td>Pelajaran</td>
                        <td>{this.state.ujian}</td>
                      </tr>
                      <tr>
                        <td>Jumlah Soal</td>
                        <td>{this.state.jumlahSoal}</td>
                      </tr>
                      <tr>
                        <td>Jumlah Benar</td>
                        <td>{this.state.jawabanBenar}</td>
                      </tr>
                      <tr>
                        <td>Jumlah Salah</td>
                        <td>{this.state.jawabanSalah}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">Nilai</div>
                <div className="text-center nilai-kamu-nilai-akhir mb-3">
                  {this.state.nilai}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="daftar-ujian-right-card">
                <div className="daftar-ujian-left-title">
                  <i className="fas fa-exclamation-triangle pr-3"></i>Info
                </div>
                <hr />
                <button
                  onClick={() => {
                    const search = this.props.location.search;
                    const params = new URLSearchParams(search);
                    const id = params.get("id_ujian");

                    this.props.history.push(`/deskripsi-soal?id_ujian=${id}`);
                  }}
                  className="form-control btn btn-info"
                >
                  Lihat Keterangan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NilaiKamu);
