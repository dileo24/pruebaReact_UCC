import {
  CLEAN_USER,
  GET_PROFESIONES,
  GET_USER_ACTUAL,
  GET_USUARIOS,
  SEARCHxNOMBRE,
} from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  profesiones: [],
  usuariosBusq: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
        usuariosBusq: [...action.payload],
      };
    case GET_PROFESIONES:
      return {
        ...state,
        profesiones: [...action.payload],
      };

    case GET_USER_ACTUAL:
      return {
        ...state,
        userActual: action.payload,
      };

    case CLEAN_USER:
      localStorage.removeItem("userActual");
      return {
        ...state,
        userActual: null,
      };

    case SEARCHxNOMBRE: {
      let removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      let searchResult = [];
      searchResult = state.usuarios.filter((user) =>
        removeAccents(user.nombre.toLowerCase()).includes(
          removeAccents(action.payload.toLowerCase())
        )
      );
      return {
        ...state,
        usuariosBusq: searchResult,
      };
    }

    default:
      return {
        ...state,
      };
  }
}

const storedUserActual = localStorage.getItem("userActual");
if (storedUserActual) {
  initialState.userActual = JSON.parse(storedUserActual);
}

export default rootReducer;
