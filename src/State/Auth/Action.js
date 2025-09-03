// Auth/Action.js
import {
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGOUT
} from "./ActionTypes";

import api from "@/config/api";

// ---------------------- REGISTER ----------------------
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await api.post("/auth/signup", userData);
    const user = response.data;
    console.log("✅ Register success:", user);

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        payload: "JWT not received after registration",
      });
    }
  } catch (error) {
    console.error("❌ Register error:", error.response?.data || error.message);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------------- LOGIN ----------------------
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    console.log("🚀 Sending login data:", userData);
    const response = await api.post("/auth/login", userData);
    console.log("✅ Login success:", response.data);

    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "JWT not received after login",
      });
    }
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------------- GET USER PROFILE ----------------------
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const user = response.data;
    console.log("✅ Get user profile:", user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.error("❌ Get user error:", error.response?.data || error.message);
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------------- LOGOUT ----------------------
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
