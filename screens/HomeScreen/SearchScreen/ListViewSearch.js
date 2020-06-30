import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import { CustomText } from "../../../components/CustomText";
import { HotelSmall } from "../../../components/cards/HotelSmall";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import COLORS from "../../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { SmallCardSlider, LargeHotelSlider } from "../../../components";

export const ListViewSearch = ({ hotels }) => {
  return (
    <ScrollView>
      <SmallCardSlider hotels={hotels} title="Near the beaches" />
      <LargeHotelSlider hotels={hotels} bgColor={"bgcDark"} />
    </ScrollView>
  );
};
