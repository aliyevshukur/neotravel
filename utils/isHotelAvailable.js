// Find if there is at least one room of hotel with entered dateRange
export const isHotelAvailable = (
  rooms,
  hotelID,
  dateRange,
  reservationsData
) => {
  const { startDate, endDate } = dateRange;
  const result = true;
  const roomsOfHotel = rooms.filter((room) => room.hotelID === hotelID);
  console.log("hi", reservationsData);

  reservationsData.forEach((reservation) => {
    roomsOfHotel.forEach((room) => {
      if (reservation.roomId === room.id) {
        const yearFilter =
          (startDate.getFullYear() <
            new Date(reservation.startDate).getFullYear() &&
            endDate.getFullYear() <
              new Date(reservation.startDate).getFullYear()) ||
          (startDate.getFullYear() >
            new Date(reservation.endDate).getFullYear() &&
            endDate.getFullYear() >
              new Date(reservation.endDate).getFullYear());
        console.log("yearFilter", yearFilter);

        const monthFilter =
          (startDate.getMonth() < new Date(reservation.startDate).getMonth() &&
            endDate.getMonth() < new Date(reservation.startDate).getMonth()) ||
          (startDate.getMonth() > new Date(reservation.endDate).getMonth() &&
            endDate.getMonth() > new Date(reservation.endDate).getMonth());
        console.log("monthFilter", monthFilter);

        const dayFilter =
          (startDate.getDate() < new Date(reservation.startDate).getDate() &&
            endDate.getDate() < new Date(reservation.startDate).getDate()) ||
          (startDate.getDate() > new Date(reservation.endDate).getDate() &&
            endDate.getDate() > new Date(reservation.endDate).getDate());
        console.log("dayFilter", dayFilter);

        if (yearFilter) {
          if (monthFilter) {
            if (dayFilter) {
              result = false;
            }
          }
        }
      }
    });
  });
  return result;
};
