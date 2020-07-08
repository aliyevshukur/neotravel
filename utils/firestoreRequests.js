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
