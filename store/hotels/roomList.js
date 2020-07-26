import fb from "../../firebaseConfig";

// ACTIONS
const SET_ROOM_LIST = "SET_ROOM_LIST";

export const MODULE_NAME = "hotelList";
export const getRoomList = (state) => state[MODULE_NAME].roomList;

const initialState = {
  roomList: [],
};

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
export const setRoomList = (payload) => ({
  type: SET_ROOM_LIST,
  payload,
});

// MIDDLEWARES
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
