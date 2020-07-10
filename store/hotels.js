import fb from "../firebaseConfig";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";
const SET_ROOM_LIST = "SET_ROOM_LIST";
const SET_HOTELS_ON_DISCOUNT = "SET_HOTELS_ON_DISCOUNT";
const SET_SEARCH_ROOM_RESULT = "SET_SEARCH_ROOM_RESULT";

export const MODULE_NAME = "hotels";
export const getHotelList = (state) => state[MODULE_NAME].hotelList;
export const getRecommendedHotels = (state) =>
  state[MODULE_NAME].recommendedHotels;
export const getHotelsOnDiscount = (state) =>
  state[MODULE_NAME].hotelsOnDiscount;
export const getRoomList = (state) => state[MODULE_NAME].roomList;
export const getSearchResult = (state) => state[MODULE_NAME].searchResult;

const initialState = {
  hotelList: [],
  roomList: [],
  searchResult: [],
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
    case SET_HOTELS_ON_DISCOUNT:
      return {
        ...state,
        hotelsOnDiscount: payload,
      };
    case SET_SEARCH_ROOM_RESULT:
      return {
        ...state,
        searchResult: payload,
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

export const setHotelsOnDiscount = (payload) => ({
  type: SET_HOTELS_ON_DISCOUNT,
  payload,
});
export const setRoomList = (payload) => ({
  type: SET_ROOM_LIST,
  payload,
});

export const setSearchRoomResults = (payload) => ({
  type: SET_SEARCH_ROOM_RESULT,
  payload,
});

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

export const getHotelsOnDiscountFB = () => (dispatch) => {
  try {
    fb.db
      .collection("hotelsOnDiscount")
      .get()
      .then((snapshot) => {
        if (snapshot) {
          const hotelsOnDiscount = Object.keys(snapshot.docs).map((key) => {
            const doc = snapshot.docs[key];

            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          dispatch(setHotelsOnDiscount(hotelsOnDiscount));
        } else {
          console.log("no data");

          dispatch(setHotelsOnDiscount([]));
        }
      })
      .catch((error) => {
        console.log(error);
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

export const searchRoomsFB = (place, guests, date) => async (dispatch) => {
  const hotelData = {};
  const hotelIDs = [];

  const hotelsRef = fb.db.collection("hotels").where("city", "==", place);
  const searchedHotels = await hotelsRef.get();
  searchedHotels.forEach((doc) => {
    hotelData[doc.id] = doc.data();
    hotelIDs.push(doc.id);
  });
  if (hotelIDs.length !== 0) {
    let searchResult = [];
    const roomsRef = fb.db
      .collection("rooms")
      .where("hotelID", "in", hotelIDs)
      .where("maxGuests", ">=", guests);
    const searchedRooms = await roomsRef.get();

    searchResult = searchedRooms.docs.map((doc) => {
      return {
        id: doc.id,
        // hotelID: doc.data().hotelID,
        marker: {
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
          ...hotelData[doc.data().hotelID].marker,
        },
        hotelName: hotelData[doc.data().hotelID].name,
        hotelRating: hotelData[doc.data().hotelID].rating,
        ...doc.data(),
      };
    });
    console.log("searchResult - " + searchResult);
    if (searchResult.length !== 0) {
      console.log("searchResultHotels", searchResult);

      dispatch(setSearchRoomResults(searchResult));
      return searchResult;
    } else {
      dispatch(setSearchRoomResults([]));
      return [];
    }
  } else {
    dispatch(setSearchRoomResults([]));
    return [];
  }
};
