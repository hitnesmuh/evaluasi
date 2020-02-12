import React, { Component } from "react";
import { Button } from "react-bootstrap";

import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";

import "./Token.css";

const DATA_CONTENT = [
  {
    no: 1,
    nama: "Kode NISN",
    content: ""
  },
  {
    no: 2,
    nama: "Nama Peserta",
    content: ""
  },
  {
    no: 3,
    nama: "Jenis Kelamin",
    content: ""
  },
  {
    no: 4,
    nama: "Mata Pelajaran",
    content: ""
  }
];

const DATA_SISWA = [
  {
    nisn: "SWA6001",
    nama: "Hitnes Muharram",
    jenis_kelamin: "Laki-laki"
  }
];

const Content = props => {
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

export default class Token extends Component {
  constructor() {
    super();
    DATA_CONTENT[0].content = DATA_SISWA[0].nisn;
    DATA_CONTENT[1].content = DATA_SISWA[0].nama;
    DATA_CONTENT[2].content = DATA_SISWA[0].jenis_kelamin;
    DATA_CONTENT[3].content = "Matematika";
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>

        <div className="container">
          <div className="card mt-5">
            <div className="card-title token-card-title">
              Konfirmasi Data Peserta
            </div>
            {DATA_CONTENT.map(data => {
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
                <div className="card-text token-card-content-label">Token</div>
                <input
                  placeholder="Masukan token disini"
                  className="token-input"
                  type="text"
                  id="token"
                />
              </div>
              <NavLink href="/konfirmasi">
                <Button className="btn btn-success mb-2">SUBMIT</Button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
