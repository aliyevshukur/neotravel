import fb from "../firebaseConfig.js";

// Get room of passed hotels
export const fetchRoomsOfHotelsFB = async (hotelIDs) => {
  const resultRooms = [];

  try {
    const roomsRef = fb.db.collection("rooms").where("hotelID", "in", hotelIDs);
    const allRooms = await roomsRef.get();
    allRooms.docs.forEach((doc) => {
      resultRooms.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.log("ERROR", error);
  }
  return resultRooms;
};

// Found out if hotel has room has any room with passed price
export const filterByPriceFB = async (hotelID, price) => {
  let isExists = false;
  try {
    const roomsRef = fb.db
      .collection("rooms")
      .where("hotelID", "==", hotelID)
      .where("price", "<=", price);
    const roomsDoc = await roomsRef.get();
    roomsDoc.forEach((doc) => {
      if (doc.exists) {
        isExists = true;
      }
    });

    return isExists;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getAvailableHotels = async (rooms, dateRange) => {
  let currentTime = new Date().getTime();
  try {
    const snapshot = await fb.db
      .collection("reservations")
      .where("endDate", ">", currentTime)
      .get();
    if (snapshot.empty) {
      return [];
    }

    const availableHotelIDs = [];
    // Remaining hotels will be unavailable
    const reservedHotels = [];
    const reservations = [];
    snapshot.forEach((doc) => {
      reservations.push({ id: doc.id, ...doc.data() });
    });

    rooms.forEach((room) => {
      // Get reservation of rooms
      const roomReservations = reservations.filter(
        (reservation) => reservation.roomId === room.id
      );
      // If reservation of rooms is empty add it to available hotels
      if (roomReservations.length === 0) {
        availableHotelIDs.push(room.hotelID);
      } else {
        roomReservations.forEach((reservation) => {
          const { startDate, endDate } = reservation;
          if (
            !(
              startDate >= dateRange.startDate.getTime() &&
              startDate <= dateRange.endDate.getTime()
            ) ||
            !(
              endDate >= dateRange.startDate.getTime() &&
              endDate <= dateRange.endDate.getTime()
            )
          ) {
            availableHotelIDs.push(room.hotelID);
          }
        });
      }
    });
    return availableHotelIDs;
  } catch (error) {
    console.log(error);
  }
};
