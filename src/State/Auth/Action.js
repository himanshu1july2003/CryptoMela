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

    dispatch({ type: REGISTER_SUCCESS, payload: user });
    return { success: true, user };
  } catch (error) {
    console.error("❌ Register error:", error.response?.data || error.message);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await api.post("/auth/login", userData);
    console.log("✅ Login success:", response.data);

    // Backend se pura object aata hai
    const { jwt, ...user } = response.data;  // jwt alag, baaki user alag

    if (jwt) {
      localStorage.setItem("jwt", jwt);  // sirf string store kar
dispatch({ 
  type: LOGIN_SUCCESS, 
  payload: { jwt: jwt, user: user }   // ✅ object me explicitly key-value bhej
});
      return { success: true, jwt, user };
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: "JWT not received" });
      return { success: false, error: "JWT not received" };
    }
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.response?.data?.message || error.message };
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
