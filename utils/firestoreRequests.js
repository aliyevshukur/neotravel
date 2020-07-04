import fb from "../firebaseConfig.js";

// Get room of passed hotels
export const fetchRoomsOfHotelsFB = async (hotelIds) => {
  const result = [];

  const roomsRef = fb.db.collection("rooms").where("hotelID", "in", hotelIds);
  const allRooms = await roomsRef.get();
  allRooms.docs.forEach((doc) => {
    const room = {
      id: doc.id,
      ...doc.data(),
    };
    result.push(room);
  });

  return result;
};
