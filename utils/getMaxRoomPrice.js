export const getMinRoomPrice = (rooms, hotelID) => {
  const prices = rooms.map((room) => {
    if (room.hotelID === hotelID) {
      return room.price;
    }
  });

  return String(Math.min(...prices));
};
