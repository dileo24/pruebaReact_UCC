import {
  CLEAN_USER,
  DELETE_USUARIO,
  GET_PERFIL,
  GET_POSTEOS,
  GET_PROFESIONES,
  GET_USER_ACTUAL,
  GET_USUARIOS,
  SEARCH_POSTS,
  SEARCHxNOMBRE,
  DELETE_POST,
} from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  profesiones: [],
  usuariosBusq: [],
  posteos: [],
  posteosBusq: [],
  perfil: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
        usuariosBusq: [...action.payload],
      };

    case DELETE_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.filter((user) => user.id !== action.payload),
      };
    case DELETE_POST:
      return {
        ...state,
        posteos: state.posteos.filter((user) => user.id !== action.payload),
      };

    case GET_PERFIL:
      return {
        ...state,
        perfil: action.payload,
      };

    case GET_PROFESIONES:
      return {
        ...state,
        profesiones: [...action.payload],
      };

    case GET_POSTEOS:
      return {
        ...state,
        posteos: [...action.payload],
        posteosBusq: [...action.payload],
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
    case SEARCH_POSTS: {
      let removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      let searchResult = [];
      searchResult = state.posteos.filter((post) =>
        removeAccents(post.titulo.toLowerCase()).includes(
          removeAccents(action.payload.toLowerCase())
        )
      );

      return {
        ...state,
        posteosBusq: searchResult,
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
