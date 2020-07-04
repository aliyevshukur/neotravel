import fb from "../firebaseConfig";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";
const SET_RECOMMENDED_HOTELS = "SET_RECOMMENDED_HOTELS";
const SET_ROOM_LIST = "SET_ROOM_LIST";
const SET_HOTELS_ON_DISCOUNT = "SET_HOTELS_ON_DISCOUNT";

export const MODULE_NAME = "hotels";
export const getHotelList = (state) => state[MODULE_NAME].hotelList;
export const getRecommendedHotels = (state) =>
  state[MODULE_NAME].recommendedHotels;
export const getHotelsOnDiscount = (state) =>
  state[MODULE_NAME].hotelsOnDiscount;
export const getRoomList = (state) => state[MODULE_NAME].roomList;

const initialState = {
  hotelList: [],
  roomList: [],
  recommendedHotels: [],
  hotelsOnDiscount: [],
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
