import axios from "axios";
export const GET_USUARIOS = "GET_USUARIOS";
export const GET_PROFESIONES = "GET_PROFESIONES";
export const GET_USER_ACTUAL = "GET_USER_ACTUAL";
export const CLEAN_USER = "CLEAN_USER";
export const SEARCHxNOMBRE = "SEARCHxNOMBRE";

export const getProfesiones = () => {
  return async function (dispatch) {
    const response = await axios.get("/profesiones");
    return dispatch({
      type: GET_PROFESIONES,
      payload: response.data,
    });
  };
};

export const getUsuarios = () => {
  return async function (dispatch) {
    const response = await axios.get("/usuarios");
    return dispatch({
      type: GET_USUARIOS,
      payload: response.data.resultado,
    });
  };
};

export const searchXname = (nombre) => {
  console.log("buscando", nombre);
  return {
    type: SEARCHxNOMBRE,
    payload: nombre,
  };
};

export const getUserActual = (userData) => {
  return async function (dispatch) {
    const storedUserActual = localStorage.getItem("userActual");
    if (!storedUserActual) {
      // si no, pedir que se logee y guardar datos
      const response = await axios.post("/usuarios/login", userData);
      const userActual = await response.data;

      localStorage.setItem("userActual", JSON.stringify(userActual));

      return dispatch({
        type: GET_USER_ACTUAL,
        payload: userActual,
      });
    } else {
      // si ya se logeó, reutilizar su info como usuario actual
      const parsedUserActual = JSON.parse(storedUserActual);
      return dispatch({
        type: GET_USER_ACTUAL,
        payload: parsedUserActual,
      });
    }
  };
};

export const register = (userData) => {
  return async function () {
    const response = await axios.post("/usuarios/register", userData);
    return response;
  };
};

export function cleanUserActual() {
  return {
    type: CLEAN_USER,
  };
}
