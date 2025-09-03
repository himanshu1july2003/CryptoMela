
import api from "@/config/api";
import * as types from "./ActionTypes";

// Action Creators
export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type:types.GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get("/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });
    console.log("wallet data->>>>>>>>>",response.data)
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};
export const getWalletTransactions = ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });
console.log("JWT before request:", jwt);
    try {
      const response = await api.get("/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
console.log("Wallet API Response:", response);
      dispatch({
        type: types.GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data,
      });
      console.log("wallet transaction", response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_WALLET_TRANSACTION_FAILURE,
        error: error.message,
      });
    }
  };
  export const depositMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.put(`/wallet/deposit`, null, {
        params: {
          orderId, // ✅ yaha pe orderId
          paymentId, // ✅ yaha pe paymentId
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: types.DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });

      // 👇 yaha wallet ko refresh karao
      dispatch(getUserWallet(jwt));

      navigate("/wallet");
      console.log("deposit response", response.data);
    } catch (error) {
      console.error(error);
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

//   export const depositMoney =
//   ({ jwt, orderId, paymentId, navigate }) =>
//   async (dispatch) => {
//     dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

//     console.log("-=-==-=-=-",orderId,paymentId)
//     try {
//       const response = await api.put(`/wallet/deposit`, null, {
//         params: {
//           order_id: orderId,
//           payment_id: paymentId,
//         },
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });

//       dispatch({
//         type: types.DEPOSIT_MONEY_SUCCESS,
//         payload: response.data,
//       });
//       navigate("/wallet");
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//     dispatch({
//       type: types.DEPOSIT_MONEY_FAILURE,
//       error: error.message,
//     });
//   }
// }; 
export const paymentHandler =
  ({ jwt, amount, payment }) =>
  async (dispatch) => {
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.post(
        `api/payment/${payment}/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      window.location.href = response.data.payment_url;
    //   dispatch({
    //     type: types.DEPOSIT_MONEY_SUCCESS,
    //     payload: response.data,
    //   });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatch) => {
    dispatch({ type: types.TRANSFER_MONEY_REQUEST });
    try {
  const response = await api.put(
    `/wallet/${walletId}/transfer`,
    reqData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  dispatch({
    type: types.TRANSFER_MONEY_SUCCESS,
    payload: response.data,
  });
} catch (error) {
  dispatch({
    type: types.TRANSFER_MONEY_FAILURE,
    error: error.message,
  });
}
}
export const handlePaymentSuccess = async (orderId, paymentId) => {
    try {
      await axios.get(
        `https://cryptomela.onrender.com/wallet/deposit?orderId=${orderId}&paymentId=${paymentId}`
      );
      // deposit hone ke turant baad updated wallet fetch karo
      
    } catch (err) {
      console.error("Payment success update error:", err);
    }
  }; 