import fb from "../firebaseConfig";
import { Alert } from "react-native";

// NOTIFICATIONS ACTIONS
const FETCH_NOTIFICATIONS_REQUEST = "FETCH_NOTIFICATIONS_REQUEST";
const FETCH_NOTIFICATIONS_ERROR = "FETCH_NOTIFICATIONS_ERROR";
const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";

export const MODULE_NAME = "notificationReducer";
export const getNotifications = (state) =>
  state[MODULE_NAME].notifications.data;
export const getNotificationsLoading = (state) =>
  state[MODULE_NAME].notifications.loading;
export const getNotificationsError = (state) =>
  state[MODULE_NAME].notifications.error;

const initalState = {
  notifications: {
    data: [],
    loading: false,
    error: "",
  },
};

export function reducer(state = initalState, { type, payload }) {
  switch (type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: true,
          errorMsg: "",
        },
      };
    case FETCH_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: false,
          errorMsg: payload,
        },
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: false,
          errorMsg: "",
          data: payload,
        },
      };

    default:
      return state;
  }
}

// ACTIONS CREATORS
export const fetchNotificationsRequest = () => {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST,
  };
};

export const fetchNotificationsError = (payload) => {
  return {
    type: FETCH_NOTIFICATIONS_ERROR,
    payload,
  };
};

export const fetchNotificationsSuccess = (payload) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload,
  };
};

// MIDDLEWARES
export const sendNotificationFB = (payload) => (dispatch) => {
  try {
    notificationsRef = fb.db.collection("notifications").doc();
    notificationsRef.set(payload);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getNotificationsFB = (userID) => async (dispatch) => {
  try {
    console.log("userID", userID);
    dispatch(fetchNotificationsRequest());
    const notificationsRef = fb.db
      .collection("notifications")
      .where("userID", "==", userID);
    const notificationsSnap = await notificationsRef.get();

    const notificationsArr = [];
    if (notificationsSnap) {
      notificationsSnap.forEach((doc) => {
        notificationsArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      dispatch(fetchNotificationsSuccess(notificationsArr));
    } else {
      dispatch(fetchNotificationsSuccess([]));
    }
  } catch (error) {
    dispatch(fetchNotificationsError(error));
  }
};
