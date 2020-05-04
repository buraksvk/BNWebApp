import * as actionTypes from "./actionTypes";
import postRegister from '../../lib/api/postRegister';
import {message } from "antd"

const error = () => {
  message.error("Lütfen Giriş Yapın");
};

export const Register = (register) => {
    return {
        type: actionTypes.REGISTER_USER,
        payload: register,
    };
};

export function registerUser(obj) {
    return function(dispatch) {
      postRegister(obj).then(res => {
        dispatch(Register(res));
        if (res != "") {
          console.log("basarili")
        } else {
          error();
        }
      });
    };
  }