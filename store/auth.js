import fb from "../firebaseConfig";
import { Alert } from "react-native";

const SET_STATUS = "SET_STATUS";
const SET_USERNAME = "SET_USERNAME";

export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectUserName = (state) => state[MODULE_NAME].userName;

const initalState = {
  status: false,
  userName: "",
};

export function reducer(state = initalState, { type, payload }) {
  switch (type) {
    case SET_STATUS:
      return {
        ...state,
        status: payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        userName: payload,
      };
    default:
      return state;
  }
}

export const setStatus = (payload) => ({
  type: SET_STATUS,
  payload,
});

export const setUserName = (payload) => ({
  type: SET_USERNAME,
  payload,
});

export const sign = (email, password, isSignIn, userName = "John") => async (
  dispatch
) => {
  try {
    if (!isSignIn) {
      const signUp = await fb.auth.signInWithEmailAndPassword(email, password);
      if (signUp) {
        dispatch(setStatus(true));
      }
    } else {
      await fb.auth.createUserWithEmailAndPassword(email, password).then(() => {
        fb.auth.currentUser.updateProfile({
          displayName: userName,
        });
      });
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const getUserName = () => async (dispatch) => {
  try {
    const userName = fb.auth.currentUser.displayName;
    dispatch(setUserName(userName));
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const logOut = () => (dispatch) => {
  try {
    const signOut = fb.auth.signOut();
    if (signOut) {
      dispatch(setStatus(false));
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
