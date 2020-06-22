import React, { Component } from "react";
import MathJax from "react-mathjax";

import TopBar from "../Components/TopBar";
import { AuthContext } from "../Contexts/Authentication";

import "./DaftarUjian.css";

const TableDeskripsiSoal = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>
        <MathJax.Provider>
          <MathJax.Node inline formula={props.data.pertanyaan} />
        </MathJax.Provider>
      </td>
      <td>
        <MathJax.Provider>
          <MathJax.Node inline formula={props.data.kunci} />
        </MathJax.Provider>
      </td>
      <td>
        {" "}
        <MathJax.Provider>
          <MathJax.Node inline formula={props.data.jawaban} />
        </MathJax.Provider>
      </td>
      <td>{props.data.analisis}</td>
      <td>{props.data.keterangan}</td>
    </tr>
  );
};

export default class DeskripsiSoal extends Component {
  static contextType = AuthContext;

  state = {
    list: [],
  };

  fetchJawaban = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idUjian = params.get("id_ujian");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/jawaban/siswa/${this.context.data.id}/${idUjian}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          list: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchJawaban();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="daftar-ujian-left-card">
                <div className="daftar-ujian-left-title">Deskripsi Soal</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>No</td>
                        <td>Pertanyaan</td>
                        <td>Kunci Jawaban</td>
                        <td>Jawaban Siswa</td>
                        <td>Analisis</td>
                        <td>Keterangan</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map((data, index) => {
                        return (
                          <TableDeskripsiSoal
                            index={index + 1}
                            key={index}
                            data={data}
                          ></TableDeskripsiSoal>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <br />
                <div>
                  <div className="d-flex">
                    <button
                      onClick={this.props.history.goBack}
                      className="btn btn-info form-control mr-1"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => {
                        this.props.history.push("/logout");
                      }}
                      className="btn btn-danger form-control ml-1"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
