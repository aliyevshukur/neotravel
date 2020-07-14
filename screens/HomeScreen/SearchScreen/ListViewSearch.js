import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";

import { CustomText } from "../../../components/CustomText";
import { HotelSmall } from "../../../components/cards/HotelSmall";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import COLORS from "../../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { SmallCardSlider, LargeHotelSlider } from "../../../components";

export const ListViewSearch = ({ hotels, navigation }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  const onItemPress = (item) => {
    
    navigation.navigate("HotelScreen", { hotelInfo: item });
  };

  return (
    <ScrollView>
      <SmallCardSlider
        hotels={hotels}
        title="Near the beaches"
        onItemPress={(item) => onItemPress(item)}
      />
      <LargeHotelSlider
        hotels={hotels}
        bgColor={theme == "light" ? "bgcDark" : "white"}
        onItemPress={(item) => onItemPress(item)}
      />
    </ScrollView>
  );
};
