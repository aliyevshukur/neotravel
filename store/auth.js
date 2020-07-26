import fb from "../firebaseConfig";
import { Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { getPaymentsFromFirebase } from "./payments";

const SET_STATUS = "SET_STATUS";
const SET_USERNAME = "SET_USERNAME";
const SET_USERID = "SET_USERID";
const SET_USERPHOTOURL = "SET_USERPHOTOURL";
const SET_PUSHTOKEN = "SET_PUSHTOKEN";

export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectUserName = (state) => state[MODULE_NAME].userName;
export const selectUserId = (state) => state[MODULE_NAME].id;
export const selectUserPhotoUrl = (state) => state[MODULE_NAME].photoUrl;
export const selectPushToken = (state) => state[MODULE_NAME].pushToken;

const initalState = {
  status: true,
  id: "",
  userName: "",
  photoUrl: "",
  pushToken: null,
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
    case SET_USERID:
      return {
        ...state,
        id: payload,
      };
    case SET_USERPHOTOURL:
      return {
        ...state,
        photoUrl: payload,
      };
    case SET_PUSHTOKEN:
      return {
        ...state,
        pushToken: payload,
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

export const setUserId = (payload) => ({
  type: SET_USERID,
  payload,
});

export const setUserProfilePhoto = (payload) => ({
  type: SET_USERPHOTOURL,
  payload,
});

export const setPushToken = (payload) => ({
  type: SET_PUSHTOKEN,
  payload,
});

export const sign = (email, password, isSignIn, userName = "John") => async (
  dispatch,
  getState
) => {
  try {
    if (!isSignIn) {
      const signIn = await fb.auth.signInWithEmailAndPassword(email, password);
      if (signIn) {
        const currentUser = fb.auth.currentUser;
        // getPaymentsFromFirebase(currentUser.uid);
        const token = await registerForPushNotificationsAsync(currentUser).then(
          (token) => {
            dispatch(setPushToken(token));
          }
        );
        console.log("hello");
        dispatch(setStatus(true));
      }
    } else {
      await fb.auth.createUserWithEmailAndPassword(email, password).then(() => {
        fb.auth.currentUser.updateProfile({
          displayName: userName,
        });
        // const currentUser = fb.auth.currentUser;
        // const token = await registerForPushNotificationsAsync(currentUser);
        // dispatch(setPushToken(token));

        const hotelIDs = [];
        fb.db
          .collection("hotels")
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              hotelIDs.push(doc.id);
            });
            const randomIDs = [];
            for (let i = 0; i < 4; i++) {
              const randomNum = Math.floor(Math.random() * hotelIDs.length);
              randomIDs.push(hotelIDs[randomNum]);
            }
            fb.db.collection("users").doc(fb.auth.currentUser.uid).set({
              id: fb.auth.currentUser.uid,
              name: userName,
              favorites: [],
              email: email,
              recommendeds: randomIDs,
            });
          });

        dispatch(setStatus(true));
      });
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const getUserInfo = () => (dispatch) => {
  try {
    const userName = fb.auth.currentUser.displayName;
    const userId = fb.auth.currentUser.uid;
    const profilePhoto = fb.auth.currentUser.photoURL;
    dispatch(setUserProfilePhoto(profilePhoto));
    dispatch(setUserName(userName));
    dispatch(setUserId(userId));
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const uploadProfilePhoto = (profilePhoto) => (dispatch) => {
  try {
    dispatch(setUserProfilePhoto(profilePhoto));
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const updateUserName = (userName) => (dispatch) => {
  try {
    dispatch(setUserName(userName));
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const logOut = () => (dispatch) => {
  try {
    const signOut = fb.auth.signOut();
    if (signOut) {
      // logOut();
      dispatch(setUserProfilePhoto(""));
      dispatch(setUserName(""));
      dispatch(setStatus(false));
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

//Notification handlers
const registerForPushNotificationsAsync = async (currentUser) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  try {
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fb.database.ref("users/" + currentUser.uid + "/push_token").set(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
