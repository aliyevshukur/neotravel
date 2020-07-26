import fb from "../../firebaseConfig";
import { MODULE_NAME as hotelsModuleName } from "../hotels/index";

// RECOMMENDED HOTELS ACTIONS
const FETCH_RECOMMENDED_HOTELS_REQUEST = "FETCH_RECOMMENDED_HOTELS_REQUEST";
const FETCH_RECOMMENDED_HOTELS_ERROR = "FETCH_RECOMMENDED_HOTELS_ERROR";
const FETCH_RECOMMENDED_HOTELS_SUCCESS = "FETCH_RECOMMENDED_HOTELS_SUCCESS";

export const MODULE_NAME = "recommendedHotels";

export const getRecommendedHotelsLoading = (state) =>
  state[hotelsModuleName][MODULE_NAME].loading;
export const getRecommendedHotelsError = (state) =>
  state[hotelsModuleName][MODULE_NAME].error;
export const getRecommendedHotelsData = (state) =>
  state[hotelsModuleName][MODULE_NAME].data;

const initialState = {
  loading: false,
  errorMsg: "",
  data: [],
};

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RECOMMENDED_HOTELS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case FETCH_RECOMMENDED_HOTELS_ERROR:
      return {
        ...state,
        errorMsg: payload,
      };
    case FETCH_RECOMMENDED_HOTELS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        data: payload,
      };

    default:
      return state;
  }
};

// ACTION CREATORS
export const fetchRecommendedHotelsRequest = () => {
  return {
    type: FETCH_RECOMMENDED_HOTELS_REQUEST,
  };
};

export const fetchRecommendedHotelsError = (payload) => {
  return {
    type: FETCH_RECOMMENDED_HOTELS_ERROR,
    payload,
  };
};

export const fetchRecommendedHotelsSuccess = (payload) => {
  return {
    type: FETCH_RECOMMENDED_HOTELS_SUCCESS,
    payload,
  };
};

// MIDDLEWARES
export const getRecommendedHotelsFB = (hotelIDs) => async (dispatch) => {
  try {
    dispatch(fetchRecommendedHotelsRequest());
    const hotelsRef = fb.db
      .collection("hotels")
      .where("__name__", "in", hotelIDs);
    const allHotels = await hotelsRef.get();

    if (allHotels) {
      const hotelsArr = [];

      allHotels.forEach((doc) => {
        hotelsArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      dispatch(fetchRecommendedHotelsSuccess(hotelsArr));
    } else {
      dispatch(fetchRecommendedHotelsSuccess([]));
    }
  } catch (error) {
    dispatch(fetchRecommendedHotelsError(error));
  }
};
