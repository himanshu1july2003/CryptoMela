import api from '@/config/api';
import * as types from './ActionTypes';

// Action Creators
export const payOrder = ({ jwt, orderData, amount }) => async (dispatch) => {
    dispatch({
        type: types.PAY_ORDER_REQUEST
    });

    try {
        const response = await api.post('/orders/pay', orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({
            type: types.PAY_ORDER_SUCCESS,
            payload: response.data,
        });

        console.log("order success", response.data);
    } catch (error) {
        dispatch({
            type: types.PAY_ORDER_FAILURE,
            error: error.message || "Payment failed",
        });

        console.error("order failure", error);
    }
};
export const getAllOrdersForUser = ({ jwt, orderType, assetSymbol }) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_REQUEST });

  try {
    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        order_type: orderType,
        asset_symbol: assetSymbol,
      },
    });

    dispatch({
      type: types.GET_ALL_ORDERS_SUCCESS,
      payload: response.data,
    });
    console.log("Order Success",response.data)
  } catch (error) {
    dispatch({
      type: types.GET_ALL_ORDERS_FAILURE,
      error: error.message || "Failed to fetch orders",
    });
  }
};