import fb from "../../firebaseConfig";
import { getAvailableHotels } from "../../utils/firestoreRequests";

// ACTIONS
const FETCH_SEARCH_REQUEST = "FETCH_SEARCH_REQUEST";
const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
const FETCH_SEARCH_ERROR = "FETCH_SEARCH_ERROR";

const SET_SEARCH_HOTEL_RESULT = "SET_SEARCH_HOTEL_RESULT";
const SET_PURE_SEARCH_RESULT = "SET_PURE_SEARCH_RESULT";
const SET_LAST_SEARCH_FIELD_VALUES = "SET_LAST_SEARCH_FIELD_VALUES";

// FILTER
const SET_FILTERED_RESULT = "SET_FILTERED_RESULT";
const SET_LAST_USER_CHOICES = "SET_LAST_USER_CHOICES";

export const MODULE_NAME = "searchAndFilter";
export const getSearchResult = (state) =>
  state.hotels[MODULE_NAME].searchResult;
export const getSearchLoading = (state) =>
  state.hotels[MODULE_NAME].loading;
export const getSearchError = (state) =>
  state.hotels[MODULE_NAME].error;

export const getPureSearchResult = (state) =>
  state.hotels[MODULE_NAME].pureSearchResult;
export const getLastUserChoices = (state) =>
  state.hotels[MODULE_NAME].lastUserChoices;

const initialState = {
  pureSearchResult: [],
  searchResult: [],
  loading: false,
  error: "",
  lastSearchFieldValues: {},
  lastUserChoices: {
    budget: "",
    rating: "",
    reviewScore: "",
    type: "",
    breakfast: false,
    deals: false,
  },
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        searchResult: payload,
      };
    case SET_SEARCH_HOTEL_RESULT:
      return {
        ...state,
        searchResult: payload,
      };
    case SET_PURE_SEARCH_RESULT:
      return {
        ...state,
        pureSearchResult: payload,
      };
    case SET_LAST_SEARCH_FIELD_VALUES:
      return {
        ...state,
        lastSearchFieldValues: payload,
      };
    case SET_LAST_USER_CHOICES:
      return {
        ...state,
        lastUserChoices: payload,
      };
    default:
      return state;
  }
};

// ACTION CREATORS
export const fetchSearchRequest = () => ({
  type: FETCH_SEARCH_REQUEST,
});

export const fetchSearchSuccess = (payload) => ({
  type: FETCH_SEARCH_SUCCESS,
  payload,
});

export const fetchSearchError = () => ({
  type: FETCH_SEARCH_ERROR,
});

export const setSearchHotelResults = (payload) => ({
  type: SET_SEARCH_HOTEL_RESULT,
  payload,
});

export const setPureSearchResults = (payload) => ({
  type: SET_PURE_SEARCH_RESULT,
  payload,
});

export const setLastSearchFieldValues = (payload) => {
  return {
    type: SET_LAST_SEARCH_FIELD_VALUES,
    payload,
  };
};

export const setFilteredResult = (payload) => {
  return {
    type: SET_FILTERED_RESULT,
    payload,
  };
};

export const setLastUserChoices = (payload) => {
  return {
    type: SET_LAST_USER_CHOICES,
    payload,
  };
};

// MIDDLEWARES
export const searchHotelsFB = (place, guests = 0, dateRange = {}) => async (
  dispatch
) => {
  try {
    dispatch(fetchSearchRequest());

    let finalSearchResult = [];
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
      if (Object.keys(dateRange).length != 0) {
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

        const roomIDs = [];
        // Get rooms of searched city's hotels
        const roomsByHotels = roomsByGuests.filter((room) => {
          if (hotelIDs.includes(room.hotelID)) {
            roomIDs.push(room.id);
            return true;
          } else {
            return false;
          }
        });
        let avialableHotelIDs = [];
        // Check if dateRange entered

        // Get available hotels by entered date
        avialableHotelIDs = await getAvailableHotels(
          roomsByHotels,
          dateRange,
          roomIDs
        );

        hotelData.forEach((hotel) => {
          if (avialableHotelIDs.includes(hotel.id)) {
            finalSearchResult.push(hotel);
          }
        });
      } else {
        finalSearchResult = [...hotelData];
      }

      if (finalSearchResult.length !== 0) {
        dispatch(fetchSearchSuccess(finalSearchResult));
        dispatch(setPureSearchResults(finalSearchResult));
      } else {
        dispatch(fetchSearchSuccess([]));
        dispatch(setPureSearchResults([]));
      }
    } else {
      dispatch(fetchSearchSuccess([]));
      dispatch(setPureSearchResults([]));
    }
  } catch (error) {
    dispatch(fetchSearchError(error));
  }
};
