import React, { Component } from "react";

import NavLink from "../Components/NavLink";
import TopBar from "../Components/TopBar";

import "./DaftarUjian.css";

const DATA_DESKRIPSI_SOAL = [
  {
    no: 1,
    jawaban: "A",
    materi: "Integral Tentu",
    catatan: "Benar..."
  },
  {
    no: 2,
    jawaban: "A",
    materi: "Integral Tentu",
    catatan: "Salah..."
  },
  {
    no: 3,
    jawaban: "B",
    materi: "Integral Tentu",
    catatan: "Benar..."
  },
  {
    no: 4,
    jawaban: "A",
    materi: "Integral Tentu",
    catatan: "Benar..."
  },
  {
    no: 5,
    jawaban: "A",
    materi: "Integral Tentu",
    catatan: "Benar..."
  }
];

const TableDeskripsiSoal = props => {
  return (
    <tr>
      <td>{props.data.no}</td>
      <td>{props.data.jawaban}</td>
      <td>{props.data.materi}</td>
      <td>{props.data.catatan}</td>
    </tr>
  );
};

export default class DeskripsiSoal extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="daftar-ujian-left-card">
                <div className="daftar-ujian-left-title">Deskripsi Soal</div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <td>No</td>
                        <td>Jawaban</td>
                        <td>Materi</td>
                        <td>Catatan</td>
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_DESKRIPSI_SOAL.map(data => {
                        return (
                          <TableDeskripsiSoal
                            key={data.no}
                            data={data}
                          ></TableDeskripsiSoal>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div>
                  <NavLink href="/logout">
                    <button className="btn form-control btn-info">
                      Selesai
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
