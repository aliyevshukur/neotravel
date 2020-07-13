import fb from "../firebaseConfig";
import { Alert } from "react-native";

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const MODULE_NAME = "user";
export const getUserData = (state) => state[MODULE_NAME].userData;
export const getLoading = (state) => state[MODULE_NAME].loading;
export const getErrorMsg = (state) => state[MODULE_NAME].errorMsg;

const initalState = {
  userData: {},
  loadIng: true,
  errorMsg: "",
};

export function reducer(state = initalState, { type, payload }) {
  switch (type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        errorMsg: payload,
        loading: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserFailure = (payload) => ({
  type: FETCH_USER_FAILURE,
  payload,
});

export const fetchUserSuccess = (payload) => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const getUserDataFB = (userID) => async (dispatch) => {
  try {
    dispatch(fetchUserRequest());

    const userRef = fb.db.collection("users").doc(userID);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      dispatch(fetchUserSuccess(userDoc.data()));
    } else {
      dispatch(fetchUserError("NO DATA FOUND"));
    }
  } catch (error) {
    fetchUserFailure(error);
  }
};
