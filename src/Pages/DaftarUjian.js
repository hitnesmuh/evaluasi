import React, { Component } from "react";

import NavLink from "../Components/NavLink";
import TopBar from "../Components/TopBar";

import "./DaftarUjian.css";

const DATA_DAFTAR_UJIAN = [
  {
    no: 1,
    judul: "UNBK",
    pelajaran: "Matematika"
  },
  {
    no: 2,
    judul: "UAS",
    pelajaran: "Fisika"
  }
];

const TableDaftarUjian = props => {
  return (
    <tr>
      <td>{props.data.no}</td>
      <td>{props.data.judul}</td>
      <td>{props.data.pelajaran}</td>
      <td>
        <NavLink href="/nilai-kamu">
          <button className="btn btn-info">Lihat Nilai</button>
        </NavLink>
      </td>
    </tr>
  );
};

export default class DaftarUjian extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="daftar-ujian-left-card">
                <div className="daftar-ujian-left-title">Daftar Ujian</div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <td>No</td>
                        <td>Judul</td>
                        <td>Pelajaran</td>
                        <td>Aksi</td>
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_DAFTAR_UJIAN.map(data => {
                        return (
                          <TableDaftarUjian
                            key={data.no}
                            data={data}
                          ></TableDaftarUjian>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="daftar-ujian-right-card">
                <div className="daftar-ujian-left-title">
                  <i className="fas fa-exclamation-triangle pr-3"></i>Info
                </div>
                <hr />
                <div className="daftar-ujian-left-sub-title">Pengumuman</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
