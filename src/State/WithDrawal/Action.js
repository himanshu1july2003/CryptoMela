import api from "@/config/api";
import { WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_FAILURE, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_SUCCESS, GET_WITHDRAWAL_HISTORY_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE, ADD_PAYMENT_DETAILS_REQUEST, ADD_PAYMENT_DETAILS_SUCCESS, ADD_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_REQUEST } from "./ActionTypes";

export const withdrawalRequest = (amount, jwt) => async dispatch => {
    dispatch({ type: WITHDRAWAL_REQUEST });
    try {
        const response = await api.post(`/withdrawal/${amount}`, null, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("withdrawal --- ", response.data);
        dispatch({
            type: WITHDRAWAL_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: WITHDRAWAL_FAILURE,
            payload: error.message
        });
    }
};
export const proceedWithdrawal = ({ id, jwt, accept }) => async dispatch => {
    dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });
    try {
        const response = await api.patch(`/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("proceed withdrawal --- ", response.data);
        dispatch({
            type: WITHDRAWAL_PROCEED_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: WITHDRAWAL_PROCEED_FAILURE,
            payload: error.message
        });
    }
};
export const getWithdrawalHistory = jwt => async dispatch => {
    dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });
    try {
        const response = await api.get('/admin/withdrawal', {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("get withdrawal history ---- ",response.data)
        dispatch({
            type: GET_WITHDRAWAL_HISTORY_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_WITHDRAWAL_HISTORY_FAILURE,
            payload: error.message
        });
    }

}
export const getAllWithdrawalRequest = jwt => async dispatch => {
     dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });
     try {
     const response = await api.get('/api/admin/withdrawal', {
     headers: { Authorization: `Bearer ${jwt}` }
     });
     console.log("get withdrawal requests --- ",response.data)
     dispatch({
     type: GET_WITHDRAWAL_REQUEST_SUCCESS,
     payload: response.data
     });
     } catch (error) {
     console.log("error ",error)
     dispatch({
     type: GET_WITHDRAWAL_REQUEST_FAILURE,
     payload: error.message
     });
     }
 }
 export const addPaymentDetails = ({ paymentDetails, jwt }) => async dispatch => {
  dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });
  try {
    const response = await api.post('/payment-details', paymentDetails, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("addPaymentDetails ------ ", response.data);

    dispatch({
      type: ADD_PAYMENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PAYMENT_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};
export const getPaymentDetails = ({ jwt }) => async dispatch => {
  dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });
  try {
    const response = await api.get('/payment-details', {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("get payment details ---- ", response.data);

    dispatch({
      type: GET_PAYMENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PAYMENT_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};
