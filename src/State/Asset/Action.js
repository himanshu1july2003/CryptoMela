import api from '@/config/api';
import * as types from './ActionTypes';

// Action Creators
export const getAssetById = (
  assetId, jwt
) => async (dispatch) => {
  dispatch({ type: types.GET_ASSET_REQUEST });

  try {
    const response = await api.get(`/assets/${assetId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
console.log("get asset by id",response.data)
    dispatch({
      type: types.GET_ASSET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ASSET_FAILURE,
      error: error.message || "Failed to fetch asset",
    });
  }
};
export const getAssetDetails = 
  (coinId, jwt) => 
  async (dispatch) => {
    dispatch({
      type: types.GET_ASSET_DETAILS_REQUEST
    });

    try {
      const response = await api.get(`/assets/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      dispatch({
        type: types.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });

      console.log("asset details ---", response.data)
    } catch (error) {
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };
 export const getUserAssets = (jwt) => async (dispatch) => {
  dispatch({
    type: types.GET_USER_ASSETS_REQUEST
  });

  try {
    const response = await api.get("/assets", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    dispatch({
      type: types.GET_USER_ASSETS_SUCCESS,
      payload: response.data,
    });
      console.log(" user assets  ---", response.data)
  } catch (error) {
    dispatch({
      type: types.GET_USER_ASSETS_FAILURE,
      payload: error.message,
    });
  }
};