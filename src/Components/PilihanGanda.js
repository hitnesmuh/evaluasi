import React, { Component } from "react";

import "./PilihanGanda.css";

const ABCDE = ["A", "B", "C", "D", "E"];

const Pilihan = (props) => {
  return (
    <div className="row">
      <div className="col-1">
        <div
          onClick={() => {
            props.tickBullet(props.index);
          }}
          className={props.tick}
        >
          {ABCDE[[props.index]]}
        </div>
      </div>
      <div className="col-11">
        <div className="pilihan-ganda-text">{props.jawaban}</div>
      </div>
    </div>
  );
};

export default class PilihanGanda extends Component {
  state = { selected: null };

  tickBullet = (bullet) => {
    this.setState({
      selected: bullet,
    });
  };

  render() {
    return (
      <div className={`pilihan-ganda-card p-3 ${this.props.customFont}`}>
        <div className="pilihan-ganda-soal">{this.props.soal.pertanyaan}</div>
        <div className="pilihan-ganda-pilihan">
          {this.props.soal.pilihan.map((jawaban, index) => {
            return (
              <Pilihan
                key={index}
                jawaban={jawaban.pilihan}
                index={index}
                tickBullet={this.tickBullet}
                tick={
                  this.state.selected === index
                    ? "pilihan-ganda-bullet bg-success"
                    : "pilihan-ganda-bullet"
                }
              ></Pilihan>
            );
          })}
        </div>
      </div>
    );
  }
}
