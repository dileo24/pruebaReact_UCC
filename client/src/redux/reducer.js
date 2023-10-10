import { GET_USUARIOS } from "./actions.js";

const initialState = {
  userActual: null,
  usuarios: [],
  usuariosBusq: [],
  profesiones: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
