import { fetchHotelsOfRoomsFB } from "./firestoreRequests";

export const findRecommendedRooms = async (rooms, count = 5) => {
  if (rooms.length === 0) {
    return [];
  }

  // Pick random hotels to recommend :-)
  const hotelIDS = [];
  const pickedRooms = [];

  for (let i = 0; i < count; i++) { 
    const index = Math.floor(Math.random() * rooms.length);
    if (hotelIDS.indexOf(rooms[index].id) === -1) {
      hotelIDS.push(rooms[index].hotelID);
      pickedRooms.push(rooms[index]);
    } else {
      count--;
    }
  }

  // Fetch rooms of choosen hotels
  const hotelsOfRooms = await fetchHotelsOfRoomsFB(hotelIDS);

  // Match rooms' ID and hotels' ID. Add matched hotel name to final data
  const finalData = [];
  hotelsOfRooms.forEach((hotel) => {
    pickedRooms.forEach((room) => {
      if (room.hotelID === hotel.id) {
        finalData.push({
          hotelName: hotel.name,
          hotelRating: hotel.rating,
          hotelCity: hotel.city,
          ...room,
        });
      }
    });
  });

  return finalData;
};
