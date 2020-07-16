import fb from "../firebaseConfig";
import { isRoomReserved } from "../utils/firestoreRequests";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";
const SET_ROOM_LIST = "SET_ROOM_LIST";
const SET_HOTELS_ON_DEALS = "SET_HOTELS_ON_DEALS";

// SEARCH AND FILTER
const SET_SEARCH_HOTEL_RESULT = "SET_SEARCH_HOTEL_RESULT";
const START_SEARCH_REQUEST = "START_SEARCH_REQUEST";
const SET_PURE_SEARCH_RESULT = "SET_PURE_SEARCH_RESULT";
const SET_FILTERED_RESULT = "SET_FILTERED_RESULT";
const SET_LAST_SEARCH_FIELD_VALUES = "SET_LAST_SEARCH_FIELD_VALUES";
const SET_LAST_USER_CHOICES = "SET_LAST_USER_CHOICES";

// RECOMMENDED HOTELS ACTIONS
const FETCH_RECOMMENDED_HOTELS_REQUEST = "FETCH_RECOMMENDED_HOTELS_REQUEST";
const FETCH_RECOMMENDED_HOTELS_ERROR = "FETCH_RECOMMENDED_HOTELS_ERROR";
const FETCH_RECOMMENDED_HOTELS_SUCCESS = "FETCH_RECOMMENDED_HOTELS_SUCCESS";

// HOTELS ON DEALS ACTIONS
const FETCH_HOTELS_ON_DEALS_REQUEST = "FETCH_HOTELS_ON_DEALS_REQUEST";
const FETCH_HOTELS_ON_DEALS_ERROR = "FETCH_HOTELS_ON_DEALS_ERROR";
const FETCH_HOTELS_ON_DEALS_SUCCESS = "FETCH_HOTELS_ON_DEALS_SUCCESS";

export const MODULE_NAME = "hotels";
export const getHotelList = (state) => state[MODULE_NAME].hotelList;
export const getRecommendedHotels = (state) =>
  state[MODULE_NAME].recommendedHotels;
export const getHotelsOnDeals = (state) => state[MODULE_NAME].hotelsOnDeals;
export const getRoomList = (state) => state[MODULE_NAME].roomList;
export const getSearchResult = (state) =>
  state[MODULE_NAME].search.searchResult;
export const getSearchLoading = (state) => state[MODULE_NAME].search.loading;
export const getPureSearchResult = (state) =>
  state[MODULE_NAME].search.pureSearchResult;
export const getLastUserChoices = (state) => state[MODULE_NAME].lastUserChoices;

const initialState = {
  hotelList: [],
  roomList: [],
  search: {
    lastSearchFieldValues: {},
    searchResult: [],
    loading: false,
    pureSearchResult: [],
  },
  lastUserChoices: {
    budget: "",
    rating: "",
    reviewScore: "",
    type: "",
    breakfast: false,
    deals: false,
  },
  hotelsOnDeals: {
    loading: false,
    errorMsg: "",
    data: [],
  },
  recommendedHotels: {
    loading: false,
    errorMsg: "",
    data: [],
  },
};

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_HOTEL_LIST:
      return {
        ...state,
        hotelList: payload,
      };
    case SET_ROOM_LIST:
      return {
        ...state,
        roomList: payload,
      };
    case SET_HOTELS_ON_DEALS:
      return {
        ...state,
        hotelsOnDeals: payload,
      };
    case SET_SEARCH_HOTEL_RESULT:
      return {
        ...state,
        search: {
          ...state.search,
          searchResult: payload,
          loading: false,
        },
      };
    case START_SEARCH_REQUEST:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
      };
    case SET_PURE_SEARCH_RESULT:
      return {
        ...state,
        search: {
          ...state.search,
          pureSearchResult: payload,
        },
      };
    case SET_LAST_SEARCH_FIELD_VALUES:
      return {
        ...state,
        search: {
          ...state.search,
          lastSearchFieldValues: payload,
        },
      };
    case SET_LAST_USER_CHOICES:
      return {
        ...state,
        lastUserChoices: payload,
      };
    case FETCH_RECOMMENDED_HOTELS_REQUEST:
      return {
        ...state,
        recommendedHotels: {
          ...state.recommendedHotels,
          loading: true,
          errorMsg: "",
        },
      };
    case FETCH_RECOMMENDED_HOTELS_ERROR:
      return {
        ...state,
        recommendedHotels: {
          ...state.recommendedHotels,
          errorMsg: payload,
        },
      };
    case FETCH_RECOMMENDED_HOTELS_SUCCESS:
      return {
        ...state,
        recommendedHotels: {
          ...state.recommendedHotels,
          loading: false,
          errorMsg: "",
          data: payload,
        },
      };
    case FETCH_HOTELS_ON_DEALS_REQUEST:
      return {
        ...state,
        hotelsOnDeals: {
          ...state.hotelsOnDeals,
          loading: true,
          errorMsg: "",
        },
      };
    case FETCH_HOTELS_ON_DEALS_ERROR:
      return {
        ...state,
        hotelsOnDeals: {
          ...state.hotelsOnDeals,
          loading: false,
          errorMsg: payload,
        },
      };
    case FETCH_HOTELS_ON_DEALS_SUCCESS:
      return {
        ...state,
        hotelsOnDeals: {
          ...state.hotelsOnDeals,
          data: payload,
          loading: false,
          errorMsg: "",
        },
      };
    default:
      return state;
  }
};

// ACTION CREATORS
export const setHotelList = (payload) => ({
  type: SET_HOTEL_LIST,
  payload,
});
export const setHotelsOnDeals = (payload) => ({
  type: SET_HOTELS_ON_DEALS,
  payload,
});
export const setRoomList = (payload) => ({
  type: SET_ROOM_LIST,
  payload,
});

export const setSearchHotelResults = (payload) => ({
  type: SET_SEARCH_HOTEL_RESULT,
  payload,
});
export const startSearchRequest = () => ({
  type: START_SEARCH_REQUEST,
});
export const setPureSearchResults = (payload) => ({
  type: SET_PURE_SEARCH_RESULT,
  payload,
});

export const setFilteredResult = (payload) => {
  return {
    type: SET_FILTERED_RESULT,
    payload,
  };
};

export const setLastSearchFieldValues = (payload) => {
  return {
    type: SET_LAST_SEARCH_FIELD_VALUES,
    payload,
  };
};

export const setLastUserChoices = (payload) => {
  return {
    type: SET_LAST_USER_CHOICES,
    payload,
  };
};

// RECOMMENDED HOTELS
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

// HOTELS ON DEALS
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
export const getHotelListFB = () => async (dispatch) => {
  try {
    const hotelsRef = fb.db.collection("hotels");
    const allHotels = await hotelsRef.get();

    if (allHotels) {
      const hotelsArr = Object.keys(allHotels.docs).map((key) => {
        const doc = allHotels.docs[key];
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      dispatch(setHotelList(hotelsArr));
    } else {
      dispatch(setHotelList([]));
    }
  } catch (error) {}
};

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

export const getRoomListFB = () => async (dispatch) => {
  try {
    const roomsRef = fb.db.collection("rooms");
    const allRooms = await roomsRef.get();

    if (allRooms) {
      const roomsArr = Object.keys(allRooms.docs).map((key) => {
        const doc = allRooms.docs[key];
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      dispatch(setRoomList(roomsArr));
    } else {
      dispatch(setRoomList([]));
    }
  } catch (error) {}
};

export const searchHotelsFB = (place, guests = 0, dateRange = {}) => async (
  dispatch
) => {
  dispatch(startSearchRequest());
  const hotelData = [];
  const hotelIDs = [];

  // Filter by city and set searched hotelData and hotelIDs
  const hotelsRef = fb.db.collection("hotels").where("city", "==", place);
  const searchedHotelsSnap = await hotelsRef.get();
  searchedHotelsSnap.forEach((doc) => {
    hotelData.push({ id: doc.id, ...doc.data() });
    hotelIDs.push(doc.id);
  });

  // Return empty array if result is empty
  if (hotelIDs.length !== 0) {
    // Filter rooms of filtered hotels by guest size
    const roomsRef = fb.db
      .collection("rooms")
      .where("hotelID", "in", hotelIDs)
      .where("maxGuests", ">=", guests);
    const roomsByGuestsSnap = await roomsRef.get();
    const roomsByGuests = roomsByGuestsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const unReservedRoomIDs = [];
    for (let j = 0; j < roomsByGuests.length; j++) {
      // Check if room is not reserved
      const isReserved = await isRoomReserved(
        dateRange,
        roomsByGuests[j].hotelID
      );
      console.log("IS RESERVED", isReserved);
      if (!isReserved) {
        unReservedRoomIDs.push(roomsByGuests[j].hotelID);
      }
    }

    const finalSearchResult = [];
    // Contains hotel IDs that has at least one room not reserved at entered time range
    hotelData.forEach((hotel) => {
      if (unReservedRoomIDs.includes(hotel.id)) {
        finalSearchResult.push(hotel);
      }
    });

    if (finalSearchResult.length !== 0) {
      dispatch(setSearchHotelResults(finalSearchResult));
      dispatch(setPureSearchResults(finalSearchResult));
    } else {
      dispatch(setSearchHotelResults([]));
      dispatch(setPureSearchResults([]));
    }
  } else {
    dispatch(setSearchHotelResults([]));
    dispatch(setPureSearchResults([]));
  }
};
