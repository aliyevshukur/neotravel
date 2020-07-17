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

export const getReservedHotels = async (rooms, dateRange, roomIDs) => {
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
    snapshot.forEach((doc) => {
      rooms.forEach((room) => {
        if (!availableHotelIDs.includes(room.hotelID)) {
          if (room.id === doc.data().roomId) {
            // Prevent duplicate hotelIDs
            if (!reservedHotels.includes(room.hotelID)) {
              reservedHotels.push(room.hotelID);
            }
            const { startDate, endDate } = doc.data();
            if (
              (startDate >= dateRange.startDate.getTime() &&
                startDate <= dateRange.endDate.getTime()) ||
              (endDate >= dateRange.startDate.getTime() &&
                endDate <= dateRange.endDate.getTime())
            ) {
              console.log("YES");
            } else {
              console.log(startDate, dateRange.startDate.getTime());
              console.log("INSIDE IF");
              const index = reservedHotels.indexOf(room.id);
              reservedHotels.splice(index, 1);
              availableHotelIDs.push(room.hotelID);
            }
          }
        }
      });
    });
    console.log("RESERVED HOTELS", reservedHotels);
    return reservedHotels;
  } catch (error) {
    console.log(error);
  }
};
