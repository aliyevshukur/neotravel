// import fb from "../firebaseConfig";
// import { Alert } from "react-native";

// const ADD_USER = "ADD_USER";

// export const MODULE_NAME = "user";
// export const selectAuthStatus = (state) => state[MODULE_NAME].users;

// const initalState = {
//   users: [],
// };

// export function reducer(state = initalState, { type, payload }) {
//   switch (type) {
//     case ADD_USER:
//       return {
//         ...state,
//         users: [payload, ...users],
//       };
//     default:
//       return state;
//   }
// }

// export const addUser = (payload) => ({
//   type: SET_STATUS,
//   payload,
// });

// export const addUserToUsers = (userName, email) => async (dispatch) => {
//   let newUser = fb.db.collection("users").doc();

//   newUser
//     .set({
//       name: userName,
//       favorites: [],
//       email: email,
//     })
//     .then(function () {
//       console.log("Document successfully written!");
//     })
//     .catch(function (error) {
//       console.error("Error writing document: ", error);
//     });
// };
