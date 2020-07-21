import fb from "../firebaseConfig";
import { sendPushNotification } from "../utils/pushNotification";

const SET_PAYMENTS = "SET_PAYMENTS";
const SET_INITIAL = "SET_INITIAL";

export const MODULE_NAME = "paymentReducer";

export const selectPayments = (state) => state[MODULE_NAME].payments;

const initialState = {
  payments: [],
};

// REDUCER
export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PAYMENTS:
      return {
        ...state,
        payments: [...state.payments, payload],
      };
    case SET_INITIAL:
      return initialState;
    default:
      return state;
  }
}

// ACTIONS
export const setPayments = (payload) => ({
  type: SET_PAYMENTS,
  payload,
});
export const setInitial = (payload) => ({
  type: SET_INITIAL,
  payload,
});

// MIDDLEWARES
export const getPaymentsFromFirebase = (userId, token = null) => async (
  dispatch,
  getState
) => {
  dispatch(setInitial());
  console.log(userId);
  const arrayReserv = [];
  try {
    const snapshot = await fb.db
      .collection("reservations")
      .where("userId", "==", userId)
      .orderBy("reserveDate", "desc")
      .get();
    if (snapshot.empty) {
      console.log("reservation not found");
      return;
    } else {
      snapshot.forEach((doc) => {
        arrayReserv.push({
          roomId: doc.data().roomId,
          reserveDate: doc.data().reserveDate,
          startDate: doc.data().startDate,
        });
        console.log("token" + getState().auth.pushToken);
        if (doc.data().startDate - Date.now() < 86400000) {
          sendPushNotification(
            getState().auth.pushToken,
            getState().auth.userName
          );
        }
      });
    }
    arrayReserv.forEach((item) => {
      const roomRef = fb.db.collection("rooms").doc(item.roomId);
      roomRef
        .get()
        .then(async function (doc) {
          if (doc.exists) {
            const hotelId = doc.data().hotelID;
            let hotelName = "";
            const hotelSnapshot = await fb.db
              .collection("hotels")
              .doc(hotelId)
              .get();
            if (hotelSnapshot.empty) {
              console.log("No such hotel");
              return;
            } else {
              hotelName = hotelSnapshot.data().name;
            }

            const rand = `${Math.random()}`;
            dispatch(
              setPayments({
                id: doc.id + rand,
                hotelName: hotelName,
                roomName: doc.data().name,
                price: doc.data().price,
                currency: doc.data().currency,
                date: item.reserveDate,
                imgUrl: doc.data().images[0],
                startDate: item.startDate,
              })
            );
          } else {
            console.log("No such room!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    });
  } catch (error) {
    console.log(error);
  }
};
