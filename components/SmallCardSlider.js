import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import {useSelector} from 'react-redux';

import { CustomText } from "./CustomText";
import { HotelSmall } from "./cards/HotelSmall";
import COLORS from "../styles/colors";

export const SmallCardSlider = ({
  style,
  hotels,
  title,
  transparent = false,
}) => {
  const theme = useSelector(state => state.themeReducer).theme;

  return (
    <View style={[styles.catalogueHorizontal, style]}>
      {title ? (
        <CustomText style={{...styles.catalogueHeader, color: theme=="light" ? COLORS.blackText : COLORS.white}}>{title}</CustomText>
      ) : null}
      <FlatList
        data={hotels}
        horizontal={true}
        renderItem={({ item }) => (
          <HotelSmall
            cardInfo={{
              imgUrl: item.images[0],
              price: item.price,
              name: item.hotelName,
              rating: item.hotelRating,
            }}
            style={styles.smallHotelCard}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  catalogueHorizontal: {
    height: 180,
  },
  smallHotelCard: {
    marginLeft: 18,
  },
  catalogueHeader: {
    fontFamily: "NunitoBold",
    fontSize: 22,
    color: COLORS.blackText,
    marginLeft: 21,
    marginBottom: 12,
    marginTop: 17,
  },
});
