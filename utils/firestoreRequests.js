import fb from "../firebaseConfig.js";

// Get room of passed hotels
export const fetchHotelsOfRoomsFB = async (hotelIDs) => {
  const resultHotels = [];

  const hotelsRef = fb.db
    .collection("hotels")
    .where("__name__", "in", hotelIDs);
  const allRooms = await hotelsRef.get();
  allRooms.docs.forEach((doc) => {
    resultHotels.push({ id: doc.id, ...doc.data() });
  });

  return resultHotels;
};

// Found out if hotel has room has any room with passed price
export const filterByPriceFB = async (hotelID, price) => {
  let isExists = false;
  const roomsRef = fb.db
    .collection("rooms")
    .where("hotelID", "==", hotelID)
    .where("price", ">=", price);
  const roomsData = await roomsRef.get().then((doc) => {
    if (doc.exists) {
      isExists = true;
    }
  });
  return isExists;
};
