import React, { Component } from "react";
import MathJax from "react-mathjax";

import NavLink from "../Components/NavLink";
import TopBar from "../Components/TopBar";

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
          <MathJax.Node inline formula={props.data.jawabanBenar} />
        </MathJax.Provider>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default class DeskripsiSoal extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/ujian/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          `${process.env.REACT_APP_API_URL}/soal/bank-soal/${result.id_bank_soal}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((res) => {
            var requestOptions = {
              method: "GET",
              redirect: "follow",
            };

            let x = [];

            res.forEach((data) => {
              let y;
              data.pilihan.forEach((element) => {
                if (element.is_right === 1) {
                  y = element.pilihan;
                }
              });
              let temp = {
                pertanyaan: data.pertanyaan,
                jawabanBenar: y,
              };

              x.push(temp);
            });

            this.setState({
              list: x,
            });
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
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
                <div>
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
