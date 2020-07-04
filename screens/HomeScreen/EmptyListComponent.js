import React from "react";
import { View } from "react-native";
import { HotelMedium } from "../../components/cards/HotelMedium";

export const EmptyListComponent = () => {
  return (
    <HotelMedium
      cardInfo={{
        imgUrl: "",
        price: "",
        name: "",
        rating: "",
        currency: "",
      }}
    />
  );
};
