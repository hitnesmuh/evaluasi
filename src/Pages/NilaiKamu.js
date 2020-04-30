import React, { Component } from "react";

import NavLink from "../Components/NavLink";
import TopBar from "../Components/TopBar";

import "./DaftarUjian.css";
import "./NilaiKamu.css";

import { AuthContext } from "../Contexts/Authentication";

export default class NilaiKamu extends Component {
  static contextType = AuthContext;

  state = {
    kelas: "",
    ujian: "",
    jumlahSoal: "",
    jawabanBenar: "",
    jawabanSalah: "",
    nilai: "",
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/jawaban/siswa/${this.context.data.id}/${id}`,
      // `${process.env.REACT_APP_API_URL}/jawaban/siswa/2/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch("http://127.0.0.1:5000/ujian/1", requestOptions)
          .then((response) => response.json())
          .then((res) => {
            var requestOptions = {
              method: "GET",
              redirect: "follow",
            };

            fetch("http://127.0.0.1:5000/kelas/id/1", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                let x = 0,
                  y = 0;
                result.forEach((data) => {
                  if (data.status === 1) {
                    x++;
                  } else {
                    y++;
                  }
                });

                let total = (x / result.length) * 100;

                this.setState({
                  ujian: res.mata_pelajaran,
                  kelas: data.nama,
                  jumlahSoal: result.length,
                  jawabanBenar: x,
                  jawabanSalah: y,
                  nilai: total,
                });
              })
              .catch((error) => console.log("error", error));
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    console.log(this.state);
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
                <NavLink href="/daftar-ujian">
                  <button className="form-control btn btn-info">Kembali</button>
                </NavLink>
              </div>
            </div>
            <div className="col-md-5">
              <div className="daftar-ujian-right-card">
                <div className="daftar-ujian-left-title">
                  <i className="fas fa-exclamation-triangle pr-3"></i>Info
                </div>
                <hr />.
                <NavLink href="/deskripsi-soal">
                  <button className="form-control btn btn-info">
                    Lihat Keterangan
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
