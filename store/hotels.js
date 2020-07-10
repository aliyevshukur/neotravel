import fb from "../firebaseConfig";
import { getMinRoomPrice } from "../utils/getMinRoomPrice";
import { isHotelAvailable } from "../utils/isHotelAvailable";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";
const SET_ROOM_LIST = "SET_ROOM_LIST";
const SET_RECOMMENDED_HOTELS = "SET_RECOMMENDED_HOTELS";
const SET_HOTELS_ON_DEALS = "SET_HOTELS_ON_DEALS";
const SET_SEARCH_HOTEL_RESULT = "SET_SEARCH_HOTEL_RESULT";
const SET_FILTERED_RESULT = "SET_FILTERED_RESULT";
const SET_LAST_SEARCH_FIELD_VALUES = "SET_LAST_SEARCH_FIELD_VALUES";
const SET_LAST_USER_CHOICES = "SET_LAST_USER_CHOICES";

export const MODULE_NAME = "hotels";
export const getHotelList = (state) => state[MODULE_NAME].hotelList;
export const getRecommendedHotels = (state) =>
  state[MODULE_NAME].recommendedHotels;
export const getHotelsOnDeals = (state) => state[MODULE_NAME].hotelsOnDeals;
export const getRoomList = (state) => state[MODULE_NAME].roomList;
export const getSearchResult = (state) =>
  state[MODULE_NAME].search.searchResult;
export const getLastSearchFieldValues = (state) =>
  state[MODULE_NAME].search.lastSearchFieldValues;
export const getLastUserChoices = (state) => state[MODULE_NAME].lastUserChoices;

const initialState = {
  hotelList: [],
  roomList: [],
  recommendedHotels: [],
  search: {
    lastSearchFieldValues: {},
    searchResult: [],
  },
  lastUserChoices: {},
  hotelsOnDeals: [],
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
    case SET_RECOMMENDED_HOTELS:
      return {
        ...state,
        recommendedHotels: payload,
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
export const setRecommendedHotels = (payload) => ({
  type: SET_RECOMMENDED_HOTELS,
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

export const getHotelsOnDealsFB = () => (dispatch) => {
  try {
    fb.db
      .collection("hotelsOnDeals")
      .doc("hotelIDs")
      .get()
      .then((doc) => {
        if (doc) {
          const hotelIDs = doc.data().IDs;
          dispatch(setHotelsOnDeals(hotelIDs));
        } else {
          dispatch(setHotelsOnDeals([]));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (error) {
    console.log("error", error);
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

export const searchHotelsFB = (place, guests, dateRange) => async (
  dispatch
) => {
  const hotelData = [];
  const hotelIDs = [];

  // Set searched hotelData and hotelIDs
  const hotelsRef = fb.db.collection("hotels").where("city", "==", place);
  const searchedHotelsSnap = await hotelsRef.get();
  searchedHotelsSnap.forEach((doc) => {
    hotelData.push({ id: doc.id, ...doc.data() });
    hotelIDs.push(doc.id);
  });
  if (hotelIDs.length !== 0) {
    // Filter out rooms of searched hotels
    const roomsRef = fb.db
      .collection("rooms")
      .where("hotelID", "in", hotelIDs)
      .where("maxGuests", ">=", guests);
    const searchedRoomsSnap = await roomsRef.get();
    const searchedHotelRooms = searchedRoomsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // Get reservations
    const reservationsRef = fb.db.collection("reservations");
    const reservationsSnap = await reservationsRef.get();
    const reservationsData = reservationsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // Combine results to find final data
    const finalData = hotelData.map((hotel) => {
      const minPrice = getMinRoomPrice(searchedHotelRooms, hotel.id);
      const isAvailable = isHotelAvailable(
        searchedHotelRooms,
        hotel.id,
        dateRange,
        reservationsData
      );
      if (isAvailable) {
        return {
          id: hotel.id,
          minPrice,
          ...hotel,
        };
      }
    });

    if (finalData.length !== 0) {
      dispatch(setSearchHotelResults(finalData));
    } else {
      dispatch(setSearchHotelResults([]));
    }
  } else {
    dispatch(setSearchHotelResults([]));
  }
};
