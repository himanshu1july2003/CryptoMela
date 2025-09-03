// Auth/Action.js
import {
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  OTP_VERIFICATION_REQUEST, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION_FAILURE,
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

    // Registration successful, but no JWT yet (user needs to login)
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

// ---------------------- LOGIN (Step 1 - Send OTP) ----------------------
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    console.log("🚀 Sending login data:", userData);
    const response = await api.post("/auth/login", userData);
    console.log("✅ Login success (OTP sent):", response.data);

    const otpData = response.data; // TwoFactorOTP object
    
    // Login step 1 successful - OTP sent
    dispatch({ type: LOGIN_SUCCESS, payload: { step: 'otp_sent', otpData } });
    
    return { success: true, requiresOTP: true, otpData };
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// ---------------------- VERIFY OTP (Step 2 - Get JWT) ----------------------
export const verifyOTP = (otpData) => async (dispatch) => {
  dispatch({ type: OTP_VERIFICATION_REQUEST });

  try {
    console.log("🔐 Verifying OTP:", otpData);
    const response = await api.post("/auth/verifyOtp", otpData);
    console.log("✅ OTP verification success:", response.data);

    const verificationResult = response.data; // TwoFactorOTP object with JWT
    
    if (verificationResult.jwt) {
      localStorage.setItem("jwt", verificationResult.jwt);
      dispatch({ type: OTP_VERIFICATION_SUCCESS, payload: verificationResult.jwt });
      
      // Also update login state
      dispatch({ type: LOGIN_SUCCESS, payload: verificationResult.jwt });
      
      return { success: true, jwt: verificationResult.jwt };
    } else {
      dispatch({
        type: OTP_VERIFICATION_FAILURE,
        payload: "JWT not received after OTP verification",
      });
      return { success: false, error: "JWT not received" };
    }
  } catch (error) {
    console.error("❌ OTP verification error:", error.response?.data || error.message);
    dispatch({
      type: OTP_VERIFICATION_FAILURE,
      payload: error.response?.data || error.message,
    });
    return { success: false, error: error.response?.data || error.message };
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