export const getMinRoomPrice = (rooms, hotelID) => {
  const prices = [];
  rooms.forEach((room) => {
    if (room.hotelID === hotelID) {
      prices.push(+room.price);
    }
  });

  return String(Math.min(...prices));
};
