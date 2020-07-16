import fb from "../firebaseConfig";

const SET_ROOM_AND_USER_ID = "SET_ROOM_AND_USER_ID";
const SET_RESERVE_INFO = "SET_RESERVE_INFO";
const SET_CUSTOMER_INFO = "SET_CUSTOMER_INFO";
const SET_CARD_INFO = "SET_CARD_INFO";
const SET_COMPLETED_ROOM_INFO = "SET_COMPLETED_ROOM_INFO";
const SET_COMPLETED_HOTEL_INFO = "SET_COMPLETED_HOTEL_INFO";
const SET_COMPLETED_USER_INFO = "SET_COMPLETED_USER_INFO";
const SET_COMPLETED_RESERVE_INFO = "SET_COMPLETED_RESERVE_INFO";


export const MODULE_NAME = "reservationReducer";
export const selectReserveData = (state) => state[MODULE_NAME].reservation;
export const selectCompleted = (state) => state[MODULE_NAME].completed;

const initalState = {
  completed: {
    guests: null,
    startDate: "",
    endDate: "",
    hotelName: "",
    rating: null,
    isLiked: false,
    roomName: "",
    imgUrl: "",
    price: "",
    currency: "",
    description: "",
  },
  reservation: {
    roomId: "",
    userId: "",
    guests: null,
    startDate: null,
    endDate: null,
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      postCode: "",
      country: "",
      mobilePhone: "",
    },
    cardInfo: {
      cardNumber: "",
      expiry: "",
      CVV: null,
      name: "",
    },
  }    
};

// REDUCER
export function reducer(state = initalState, { type, payload }) {
    switch (type) {
      case SET_ROOM_AND_USER_ID:
        return {
          ...state,
          reservation: {
            ...state.reservation,
            roomId: payload.roomId,
            userId: payload.userId,
          },
        };
      case SET_RESERVE_INFO:
        return {
          ...state,
          reservation: {
            ...state.reservation,
            guests: payload.guests,
            startDate: new Date(payload.dateRange.startDate).getTime(),
            endDate: new Date(payload.dateRange.endDate).getTime(),
          },
        };
      case SET_CUSTOMER_INFO:
        const currentTime = new Date().getTime();
        return {
          ...state,
          reservation: {
            ...state.reservation,
            customerInfo: {
              ...payload
            },
            reserveDate: currentTime,
          },
        };
      case SET_CARD_INFO:
        return {
          ...state,
          reservation: {
            ...state.reservation,
            cardInfo: {
              ...payload
            }
          },
        };
      case SET_COMPLETED_ROOM_INFO:
        return {
          ...state,
          completed: {
            ...state.completed,
            ...payload,
          },
        };
      case SET_COMPLETED_HOTEL_INFO:
        return {
          ...state,
          completed: {
            ...state.completed,
            ...payload,
          },
        };
      case SET_COMPLETED_USER_INFO:
        return {
          ...state,
          completed: {
            ...state.completed,
            ...payload,
          },
        };
      case SET_COMPLETED_RESERVE_INFO:
        return {
          ...state,
          completed: {
            ...state.completed,
            guests: payload.guests,
            startDate: new Date(payload.dateRange.startDate).getTime(),
            endDate: new Date(payload.dateRange.endDate).getTime(),
          },
        };
      
      default:
        return state;
    }
}



// ACTIONS
export const setRoomAndUserID = (payload) => ({
  type: SET_ROOM_AND_USER_ID ,
  payload,
});
export const setReserveInfo = (payload) => ({
  type: SET_RESERVE_INFO ,
  payload,
});
export const setCustomerInfo = (payload) => ({
  type: SET_CUSTOMER_INFO ,
  payload,
});
export const setCardInfo = (payload) => ({
  type: SET_CARD_INFO,
  payload,
});
export const setCompletedRoomInfo = (payload) => ({
  type: SET_COMPLETED_ROOM_INFO,
  payload,
});
export const setCompletedHotelInfo = (payload) => ({
  type: SET_COMPLETED_HOTEL_INFO,
  payload,
});
export const setCompletedUserInfo = (payload) => ({
  type: SET_COMPLETED_USER_INFO,
  payload,
});
export const setCompletedReserveInfo = (payload) => ({
  type: SET_COMPLETED_RESERVE_INFO,
  payload,
});

// MIDDLEWARES


export const setReservedFb = (data) => async (dispatch) => {
  try{
    await fb.db.collection("reservations").doc().set(data);
  } catch (error) {
    console.log(error);
  }
};


export const checkIfRoomReserved = (data) => async (dispatch) => {
  let currentTime = new Date().getTime();
  // console.log(currentTime);
  try{
    const snapshot = await fb.db.collection('reservations').where('endDate', '>', currentTime).where('roomId', '==', data.roomId).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return false;
    }
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      if((doc.data().startDate >= data.startDate && doc.data().startDate <= data.endDate)
      ||
      (doc.data().endDate >= data.startDate && doc.data().endDate <= data.endDate)
      ) {
        return true;
      } else {
        return false;
      }
    });
    // dispatch(setReservInfo("reserv"));
  } catch (error) {
    console.log(error);
  }
};