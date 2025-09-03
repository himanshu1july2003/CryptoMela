// State/Watchlist/Reducer.js
import { existInWatchlist } from "@/Utils/existInWatchlist";
import * as types from "./ActionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_WATCHLIST_REQUEST:
    case types.ADD_COIN_TO_WATCHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case types.GET_USER_WATCHLIST_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };

    case types.ADD_COIN_TO_WATCHLIST_SUCCESS:
      return {
        ...state,
        items: existInWatchlist(state.items, action.payload)
          ? state.items
          : [action.payload, ...state.items],
        loading: false,
        error: null,
      };

    case types.GET_USER_WATCHLIST_FAILURE:
    case types.ADD_COIN_TO_WATCHLIST_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default watchlistReducer;
