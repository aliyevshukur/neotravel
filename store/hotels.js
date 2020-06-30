import fb from "../firebaseConfig";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";
const SET_ROOM_LIST = "SET_ROOM_LIST";

export const MODULE_NAME = "hotels";
export const getHotelList = (state) => state[MODULE_NAME].hotelList;
export const getRoomList = (state) => state[MODULE_NAME].roomList;

const initialState = {
  hotelList: [],
  roomList: [],
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
    default:
      return state;
  }
};

// ACTION CREATORS
export const setHotelList = (payload) => ({
  type: SET_HOTEL_LIST,
  payload,
});

// MIDDLEWARES
export const getHotelListFB = () => (dispatch) => {
  try {
    fb.db
      .collection("hotels")
      .get()
      .then((snapshot) => {
        if (snapshot) {
          const hotelsArr = Object.keys(snapshot.docs).map((key) => {
            const doc = snapshot.docs[key];
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          dispatch(setHotelList(hotelsArr));
        } else {
          dispatch(setHotelList([]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {}
};
