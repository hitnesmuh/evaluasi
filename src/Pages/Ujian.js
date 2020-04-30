import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Countdown from "react-countdown";
import MathJax from "react-mathjax";
import { withRouter } from "react-router-dom";

import TopBar from "../Components/TopBar";

import { AuthContext } from "../Contexts/Authentication";

import "./Ujian.css";

const Time = (props) => {
  return (
    <Countdown
      onComplete={() => {
        props.history.push("/logout");
      }}
      date={Date.now() + 500000}
    ></Countdown>
  );
};

class Ujian extends Component {
  static contextType = AuthContext;

  state = {
    soal: [],
    index: 0,
    style: {
      fontSize: "1rem",
    },
    selected: null,
    status: 0,
  };

  fetchSoal = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");

    fetch(
      `${process.env.REACT_APP_API_URL}/soal/bank-soal/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          soal: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  addJawban = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");

    const raw = JSON.stringify({
      id_siswa: this.context.data.id,
      id_ujian: id,
      id_soal: this.state.soal[this.state.index].id,
      jawaban: this.state.selected,
      status: this.state.status,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/jawaban`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          index: this.state.index + 1,
          selected: null,
        });
      })
      .catch((error) => console.log("error", error));
  };

  onClickSelesai = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");

    const raw = JSON.stringify({
      id_siswa: this.context.data.id,
      id_ujian: id,
      id_soal: this.state.soal[this.state.index].id,
      jawaban: this.state.selected,
      status: this.state.status,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/jawaban`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get("x");
        this.props.history.push(`/nilai-kamu?x=${id}`);
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchSoal();
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <Container>
          <div className="ujian-box-content d-flex justify-content-between">
            <div>
              Ukuran Font Soal:
              <span
                style={{
                  fontSize: "1rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
              <span
                style={{
                  fontSize: "1.3rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1.3rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
              <span
                style={{
                  fontSize: "1.6rem",
                }}
                onClick={() => {
                  this.setState({
                    style: {
                      fontSize: "1.6rem",
                    },
                  });
                }}
                className="mx-2 clickable"
              >
                A
              </span>
            </div>
            <div>
              Sisa Waktu:
              <Time
                hitungNilai={this.hitungNilai}
                history={this.props.history}
              ></Time>
            </div>
          </div>
          <div style={this.state.style} className="ujian-box-content">
            {this.state.soal.length === 0 ? (
              ""
            ) : (
              <div>
                <div>
                  <MathJax.Provider>
                    <MathJax.Node
                      inline
                      formula={this.state.soal[this.state.index].pertanyaan}
                    />
                  </MathJax.Provider>
                </div>
                <div>
                  {this.state.soal[this.state.index].pilihan.map((data) => {
                    return (
                      <div
                        onClick={() => {
                          this.setState({
                            selected: data.id,
                            status: data.is_right,
                          });
                        }}
                        key={data.id}
                        className={`d-flex align-items-center mt-3 clickable `}
                      >
                        <div
                          className={`ujian-bullet ${
                            data.id === this.state.selected ? "selected" : ""
                          }`}
                        ></div>
                        <MathJax.Provider>
                          <MathJax.Node inline formula={data.pilihan} />
                        </MathJax.Provider>
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-end">
                  {this.state.soal.length === this.state.index + 1 ? (
                    <button
                      onClick={() => {
                        this.onClickSelesai();
                      }}
                      className="btn btn-danger"
                    >
                      Selesai
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        this.addJawban();
                      }}
                      disabled={this.state.selected === null ? true : false}
                      className="btn btn-secondary"
                    >
                      Soal Selanjutnya >
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Ujian);
