import fb from "../firebaseConfig";
import { Alert } from "react-native";

const ADD_HOTEL = "ADD_HOTEL";
const DELETE_HOTEL = "DELETE_HOTEL";

export const MODULE_NAME = "favorite";
export const selectFavorites = (state) => state[MODULE_NAME].favorites;

const initalState = {
  favorites: [],
};

export function reducer(state = initalState, { type, payload }) {
  switch (type) {
    case ADD_HOTEL:
      return {
        ...state,
        favorites: [payload, ...state.favorites],
      };
    case DELETE_HOTEL:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item !== payload),
      };
    default:
      return state;
  }
}

export const addHotel = (payload) => ({
  type: ADD_HOTEL,
  payload,
});

export const deleteHotel = (payload) => ({
  type: DELETE_HOTEL,
  payload,
});

export const updateFavoriteList = (uid) => async (dispatch) => {
  try {
    let User = fb.db.collection("users");
    const user = User.where("id", "==", fb?.auth?.currentUser?.uid);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};
