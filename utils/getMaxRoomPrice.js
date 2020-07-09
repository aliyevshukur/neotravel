export const getMaxRoomPrice = (rooms, hotelID) => {
  const prices = rooms.map((room) => {
    if (room.hotelID === hotelID) {
      return room.price;
    }
  });

  return String(Math.max(...prices));
};
