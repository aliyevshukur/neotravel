import React from "react";
import { HotelMedium } from "../../components/cards/HotelMedium";

export const EmptyListComponent = () => {
  return <HotelMedium cardInfo={{ imgUrl: "" }} />;
};
