import React, { Component } from "react";

import NavLink from "../Components/NavLink";
import TopBar from "../Components/TopBar";

import "./DaftarUjian.css";
import "./NilaiKamu.css";

const DATA_NILAI_KAMU = [
  {
    no: 1,
    label: "NISN",
    content: "SWA6001"
  },
  {
    no: 2,
    label: "Nama",
    content: "Hitnes Muharram"
  },
  {
    no: 3,
    label: "Kelas",
    content: "XII IPA 6"
  },
  {
    no: 4,
    label: "Pelajaran",
    content: "Matematika"
  },
  {
    no: 5,
    label: "Jumlah Soal",
    content: "40"
  },
  {
    no: 6,
    label: "Jawaban Benar",
    content: "20"
  },
  {
    no: 7,
    label: "Jawaban Salah",
    content: "20"
  },
  {
    no: 8,
    label: "Jawaban Kosong",
    content: "0"
  }
];

const TableNilaiKamu = props => {
  return (
    <tr>
      <td>{props.data.label}</td>
      <td>{props.data.content}</td>
    </tr>
  );
};

export default class NilaiKamu extends Component {
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
                      {DATA_NILAI_KAMU.map(data => {
                        return (
                          <TableNilaiKamu
                            key={data.no}
                            data={data}
                          ></TableNilaiKamu>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="text-center">Nilai</div>
                <div className="text-center nilai-kamu-nilai-akhir mb-3">
                  50
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
