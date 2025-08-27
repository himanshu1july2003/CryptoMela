import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  LOGOUT
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // ✅ JWT store karega
      localStorage.setItem("jwt", action.payload);
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      localStorage.removeItem("jwt");
      return { ...state, loading: false, error: action.payload, jwt: null, user: null };

    case LOGOUT:
      return { ...state, user: null, jwt: null, loading: false, error: null }; // ✅ logout pe reset

    default:
      return state;
  }
};

export default authReducer;
