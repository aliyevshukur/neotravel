import { fetchRoomsOfHotelsFB } from "./firestoreRequests";

export const findRecommendedHotels = async (hotels, count = 5) => {
  if (hotels.length === 0) {
    return pickerHotels;
  }

  // Pick random hotels to recommend :-)
  const pickedIDs = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * hotels.length);
    if (pickedIDs.indexOf(hotels[index]?.id) === -1) {
      pickedIDs.push(hotels[index]?.id);
    } else {
      count--;
    }
  }

  // Fetch rooms of choosen hotels
  const roomsOfHotels = await fetchRoomsOfHotelsFB(pickedIDs);

  // Match rooms' ID and hotels' ID. Add matched hotel name to final data
  const finalData = roomsOfHotels.map((room) => {
    const [hotelName, hotelRating, hotelCity] = findHotelName(hotels, room.hotelID);
    return {
      hotelName,
      hotelRating,
      hotelCity,
      ...room,
    };
  });

  return finalData;
};

// Add hotel name to final data
const findHotelName = (hotels, hotelID) => {
  let hotelData = [];
  hotels.forEach((hotel) => {
    if (hotel.id === hotelID) {
      hotelData = [hotel.name, hotel.rating, hotel.city];
    }
  });
  return hotelData;
};
