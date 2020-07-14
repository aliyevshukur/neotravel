import fb from "../firebaseConfig";
import { Alert } from "react-native";

const SEND_NOTFICATION = "SEND_NOTFICATION";


export const MODULE_NAME = "notfication";
export const getNotifications = (state) => state[MODULE_NAME].notfications;

const initalState = {
    notfications: [],
};

export function reducer(state = initalState, { type, payload }) {
  switch (type) {
    case SEND_NOTFICATION:
      return {
        ...state,
        notfications: [payload, ...state.notfications],
      };

    default:
      return state;
  }
}

export const sendNotfication = (payload) => ({
  type: SEND_NOTFICATION,
  payload,
});


// export const sendNotfication = (uid, isWrite = false) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     if (isWrite) {
//       await fb.db
//         .collection("users")
//         .doc(fb?.auth?.currentUser?.uid)
//         .update({
//           favorites: getState().favorite.favorites,
//         })
//         .then(() => console.log("updated successfully!"));
//     } else {
//       if (uid) {
//         const docRef = fb.db.collection("users").doc(uid);
//         await docRef
//           .get()
//           .then((doc) => dispatch(pasteFavorites(doc.data().favorites)));
//       } else {
//         console.log("there is not id");
//       }
//     }
//     console.log(getState().favorite.favorites);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
