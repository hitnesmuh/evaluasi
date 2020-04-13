import React, { Component } from "react";
import MathJax from "react-mathjax";

import "./PilihanGanda.css";

const ABCDE = ["A", "B", "C", "D", "E"];

const Pilihan = (props) => {
  return (
    <div className="row">
      <div className="col-1">
        <div
          onClick={() => {
            props.tickBullet(props.index, props.isRight);
          }}
          className={props.tick}
        >
          {ABCDE[[props.index]]}
        </div>
      </div>
      <div className="col-11">
        <div className="pilihan-ganda-text">
          <MathJax.Provider>
            <MathJax.Node inline formula={props.jawaban} />
          </MathJax.Provider>
        </div>
      </div>
    </div>
  );
};

export default class PilihanGanda extends Component {
  tickBullet = (bullet, isRight) => {
    if (isRight === 1) {
      this.props.onClickJawaban(bullet, true);
    } else {
      this.props.onClickJawaban(bullet, false);
    }
  };

  render() {
    return (
      <div className={`pilihan-ganda-card p-3 ${this.props.customFont}`}>
        <div className="pilihan-ganda-soal">
          <MathJax.Provider>
            <MathJax.Node inline formula={this.props.soal.pertanyaan} />
          </MathJax.Provider>
        </div>
        <div className="pilihan-ganda-pilihan">
          {this.props.soal.pilihan.map((jawaban, index) => {
            return (
              <Pilihan
                key={index}
                isRight={jawaban.is_right}
                jawaban={jawaban.pilihan}
                index={index}
                tickBullet={this.tickBullet}
                tick={
                  this.props.jawaban.indexJawaban === index
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
