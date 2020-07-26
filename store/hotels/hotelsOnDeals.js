import fb from "../../firebaseConfig";

// HOTELS ON DEALS ACTIONS
const FETCH_HOTELS_ON_DEALS_REQUEST = "FETCH_HOTELS_ON_DEALS_REQUEST";
const FETCH_HOTELS_ON_DEALS_ERROR = "FETCH_HOTELS_ON_DEALS_ERROR";
const FETCH_HOTELS_ON_DEALS_SUCCESS = "FETCH_HOTELS_ON_DEALS_SUCCESS";

export const MODULE_NAME = "hotelsOnDeals";

export const getHotelsOnDealsLoading = (state) =>
  state.hotels[MODULE_NAME].loading;
export const getHotelsOnDealsError = (state) => state.hotels[MODULE_NAME].error;
export const getHotelsOnDealsData = (state) => state.hotels[MODULE_NAME].data;

const initialState = {
  loading: false,
  errorMsg: "",
  data: [],
};

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_HOTELS_ON_DEALS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case FETCH_HOTELS_ON_DEALS_ERROR:
      return {
        ...state,
        loading: false,
        errorMsg: payload,
      };
    case FETCH_HOTELS_ON_DEALS_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

// ACTION CREATORS
export const fetchHotelsOnDealsRequest = () => {
  return {
    type: FETCH_HOTELS_ON_DEALS_REQUEST,
  };
};

export const fetchHotelsOnDealsError = (payload) => {
  return {
    type: FETCH_HOTELS_ON_DEALS_ERROR,
    payload,
  };
};

export const fetchHotelsOnDealsSuccess = (payload) => {
  return {
    type: FETCH_HOTELS_ON_DEALS_SUCCESS,
    payload,
  };
};
// MIDDLEWARES
export const getHotelsOnDealsFB = () => async (dispatch) => {
  try {
    dispatch(fetchHotelsOnDealsRequest());

    const hotelIDsRef = fb.db.collection("hotelsOnDeals").doc("hotelIDs");
    const hotelIDsDoc = await hotelIDsRef.get();
    let hotelIDs = [];
    if (hotelIDsDoc.exists) {
      hotelIDs = hotelIDsDoc.data().IDs;
    }

    // const
    const hotelsRef = fb.db
      .collection("hotels")
      .where("__name__", "in", hotelIDs);
    const hotelsDoc = await hotelsRef.get();
    const hotelsArr = [];
    hotelsDoc.forEach((doc) => {
      hotelsArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    dispatch(fetchHotelsOnDealsSuccess(hotelsArr));
  } catch (error) {
    dispatch(fetchHotelsOnDealsError(error));
    console.log("ERROR", error);
  }
};
