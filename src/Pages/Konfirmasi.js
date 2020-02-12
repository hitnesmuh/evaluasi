import React, { Component } from "react";
import { Button } from "react-bootstrap";

import TopBar from "../Components/TopBar";
import NavLink from "../Components/NavLink";

import "./Token.css";
import "./Konfirmasi.css";

const DATA_KONFIRMASI = [
  {
    no: 1,
    title: "Kode Tes",
    content: "SWA6001"
  },
  {
    no: 2,
    title: "Status Tes",
    content: "(MTK)"
  },
  {
    no: 3,
    title: "Mata Uji Tes",
    content: "Matematika"
  },
  {
    no: 4,
    title: "Tanggal Tes",
    content: "09/Jan/2020"
  },
  {
    no: 5,
    title: "Waktu Tes",
    content: "09/01/2020 13:00:00"
  },
  {
    no: 6,
    title: "Alokasi Waktu Tes",
    content: "120 Menit"
  }
];

const Content = props => {
  return (
    <div>
      <div className={`token-card-content ${props.no === 6 ? "mb-3" : ""}`}>
        <div className="card-text token-card-content-label">{props.nama}</div>
        <div className="card-text text-uppercase">{props.content}</div>
      </div>
      {props.no !== 6 ? <hr /> : ""}
    </div>
  );
};

export default class Konfirmasi extends Component {
  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="card mt-5">
                <div className="card-title token-card-title">
                  Konfirmasi Data Peserta
                </div>
                {DATA_KONFIRMASI.map(data => {
                  return (
                    <Content
                      key={data.no}
                      no={data.no}
                      nama={data.title}
                      content={data.content}
                    ></Content>
                  );
                })}
              </div>
            </div>
            <div className="col-5">
              <div className="card mt-5 konfirmasi-righ-box">
                Tombol MULAI hanya akan aktif apabila waktu sekarang sudah
                melewati waktu mulai tes. Tekan tombol F5 untuk merefresh
                halaman.
              </div>
              <NavLink className="asd" href="/soal">
                <Button className="btn btn-danger mb-2 form-control">
                  MULAI
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
