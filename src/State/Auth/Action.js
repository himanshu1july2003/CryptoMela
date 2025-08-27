// Auth/Action.js
import axios from "axios";
import {
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, // ✨ ADDED LOGIN ACTION TYPES ✨
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, // Added GET_USER ACTION TYPES
  LOGOUT
} from "./ActionTypes";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const baseUrl = "http://localhost:7272";

  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userData);
    const user = response.data;
    console.log("Register success response:", user);

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    //   localStorage.setItem("jwt",user.jwt)
    } else {
      dispatch({ type: REGISTER_FAILURE, payload: "JWT not received after registration" });
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.error("Register error:", error);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    console.log("🚀 Sending login data:", userData);
    const response = await axios.post("http://localhost:7272/auth/login", userData);
    console.log("✅ Login success response:", response.data);

    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: "JWT not received after login" });
    }
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  const baseUrl = "http://localhost:7272";

  try {
    const response = await axios.get(`${baseUrl}/user/profile`, { // Corrected URL: removed double slash
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    });
    const user = response.data;
    console.log("Get user success response:", user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    console.error("Get user error:", error);
  }
};

export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
};