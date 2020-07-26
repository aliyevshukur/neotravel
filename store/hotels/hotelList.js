import fb from "../../firebaseConfig";
import { MODULE_NAME as hotelsModuleName } from "../hotels/index";

// ACTIONS
const SET_HOTEL_LIST = "SET_HOTEL_LIST";

export const MODULE_NAME = "hotelList";
export const getHotelList = (state) =>
  state[hotelsModuleName][MODULE_NAME].hotelList;

const initialState = {
  hotelList: [],
};

// REDUCER
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_HOTEL_LIST:
      return {
        ...state,
        hotelList: payload,
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
  } catch (error) {
    console.log("ERROR", error);
  }
};
