import fb from "../firebaseConfig";
import { Alert } from "react-native";

const ADD_HOTEL = "ADD_HOTEL";
const DELETE_HOTEL = "DELETE_HOTEL";
const PASTE_FAVORITES = "PASTE_FAVORITES";

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
    case PASTE_FAVORITES:
      return {
        ...state,
        favorites: payload,
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

export const pasteFavorites = (payload) => ({
  type: PASTE_FAVORITES,
  payload,
});

export const updateFavoriteList = (uid, isWrite = false) => async (
  dispatch,
  getState
) => {
  try {
    if (isWrite) {
      await fb.db
        .collection("users")
        .doc(fb?.auth?.currentUser?.uid)
        .update({
          favorites: getState().favorite.favorites,
        })
        .then(() => console.log("updated successfully!"));
    } else {
      if (uid) {
        const docRef = fb.db.collection("users").doc(uid);
        await docRef
          .get()
          .then((doc) => dispatch(pasteFavorites(doc.data().favorites)));
      } else {
        console.log("there is not id");
      }
    }
    console.log(getState().favorite.favorites);
  } catch (error) {
    console.log(error.message);
  }
};
