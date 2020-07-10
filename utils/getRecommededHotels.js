import { fetchRoomsOfHotelsFB } from "./firestoreRequests";
import { getMinRoomPrice } from "../utils/getMinRoomPrice";

export const findRecommendedHotels = async (hotels, count = 5) => {
  if (hotels.length === 0) {
    return [];
  }

  // Pick random hotels to recommend :-)
  const hotelIDS = [];
  const pickedHotels = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * hotels.length);
    if (hotelIDS.indexOf(hotels[index].id) === -1) {
      hotelIDS.push(hotels[index].id);
      pickedHotels.push(hotels[index]);
    } else {
      count--;
    }
  }

  // Fetch rooms of choosen hotels
  const roomsOfHotels = await fetchRoomsOfHotelsFB(hotelIDS);

  // Match rooms' ID and hotels' ID. Add mix hotel and room data
  const finalData = [];
  pickedHotels.forEach((hotel) => {
    roomsOfHotels.forEach((room) => {
      console.log(hotel.id, room.hotelID);
      if (hotel.id === room.hotelID) {
        finalData.push({
          minPrice: getMinRoomPrice(roomsOfHotels, hotel.id),
          currency: room.currency,
          ...hotel,
        });
      }
    });
  });

  return finalData;
};
