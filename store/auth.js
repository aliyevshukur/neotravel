import fb from "../firebaseConfig";
import { Alert } from "react-native";

const SET_STATUS = "SET_STATUS";
const SET_USERNAME = "SET_USERNAME";
const SET_USERID = "SET_USERID";
const SET_USERPHOTOURL = "SET_USERPHOTOURL";

export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectUserName = (state) => state[MODULE_NAME].userName;
export const selectUserId = (state) => state[MODULE_NAME].id;
export const selectUserPhotoUrl = (state) => state[MODULE_NAME].photoUrl;

const initalState = {
  status: true,
  id: "",
  userName: "",
  photoUrl: "",
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

export const sign = (email, password, isSignIn, userName = "John") => async (
  dispatch
) => {
  try {
    if (!isSignIn) {
      const signIn = await fb.auth.signInWithEmailAndPassword(email, password);
      if (signIn) {
        dispatch(setStatus(true));
      }
    } else {
      await fb.auth.createUserWithEmailAndPassword(email, password).then(() => {
        fb.auth.currentUser.updateProfile({
          displayName: userName,
        });

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

export const getUserInfo = () => async (dispatch) => {
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
      dispatch(setStatus(false));
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
