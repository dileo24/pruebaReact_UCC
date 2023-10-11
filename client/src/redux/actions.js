import axios from "axios";
export const GET_USUARIOS = "GET_USUARIOS";
export const DELETE_USUARIO = "DELETE_USUARIO";
export const GET_PERFIL = "GET_PERFIL";
export const GET_POSTEOS = "GET_POSTEOS";
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

export const getUserID = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`/usuarios/${id}`);
    return dispatch({
      type: GET_PERFIL,
      payload: response.data.resultado,
    });
  };
};

export const getPosteos = () => {
  return async function (dispatch) {
    const response = await axios.get("/posts");
    return dispatch({
      type: GET_POSTEOS,
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
  return async function (dispatch) {
    const response = await axios.post("/usuarios/register", userData);
    const userActual = await response.data;

    localStorage.setItem("userActual", JSON.stringify(userActual));

    return dispatch({
      type: GET_USER_ACTUAL,
      payload: userActual,
    });
  };
};

export const deleteUsuario = (id) => {
  return async function (dispatch) {
    await axios.delete(`/usuarios/${id}`);
    dispatch({
      type: DELETE_USUARIO,
      payload: id,
    });
  };
};

export const updateUsuario = (id, data) => {
  return async function (dispatch) {
    await axios.put(`/usuarios/${id}`, data);

    // traer usuario actual del localStorage
    const storedUserActual = localStorage.getItem("userActual");
    const parsedUserActual = JSON.parse(storedUserActual);

    const updatedUserActual = { ...parsedUserActual, ...data }; // actualiza datos
    localStorage.setItem("userActual", JSON.stringify(updatedUserActual)); //guardar cambios

    dispatch({
      type: GET_USER_ACTUAL,
      payload: updatedUserActual,
    });
  };
};

export function cleanUserActual() {
  return {
    type: CLEAN_USER,
  };
}
