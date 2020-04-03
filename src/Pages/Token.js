import React, { Component } from "react";

import TopBar from "../Components/TopBar";

import { AuthContext } from "../Contexts/Authentication";

import "./Token.css";

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
  static contextType = AuthContext;

  state = {
    label: []
  };

  componentDidMount() {
    this.setState({
      label: [
        {
          no: 1,
          nama: "Kode NISN",
          content: this.context.data.nis
        },
        {
          no: 2,
          nama: "Nama Peserta",
          content: this.context.data.nama
        },
        {
          no: 3,
          nama: "Jenis Kelamin",
          content: this.context.data.jenis_kelamin
        },
        {
          no: 4,
          nama: "Mata Pelajaran",
          content: "Matematika"
        }
      ]
    });
  }

  onClickSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <TopBar></TopBar>

        <div className="container">
          <div className="card mt-5">
            <div className="card-title token-card-title">
              Konfirmasi Data Peserta
            </div>
            {this.state.label.map(data => {
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
                <div>
                  <input
                    placeholder="Masukan token disini"
                    className="token-input"
                    type="text"
                    id="token"
                  />
                  <button
                    onClick={this.onClickSubmit}
                    className="token-input-submit btn btn-success ml-3"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
