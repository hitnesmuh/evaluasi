// Komponen untuk menyimpan variable global

import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export default class Authentication extends Component {
  state = {
    isAuth: true,
    data: {
      id: 71,
      id_kelas: 1,
      jenis_kelamin: "Perempuan",
      nama: "AFIANI SYAHRANI LASHA",
      nilai_pretest: 0,
      nis: "181910038",
      password: "181910038",
    },
  };

  changeAuthToFalse = () => {
    this.setState({
      isAuth: false,
      data: [],
    });
  };

  changeAuthToTrue = (data) => {
    this.setState({
      isAuth: true,
      data: data,
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          changeAuthToFalse: this.changeAuthToFalse,
          changeAuthToTrue: this.changeAuthToTrue,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
