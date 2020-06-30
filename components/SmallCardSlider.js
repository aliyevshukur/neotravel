import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import { CustomText } from "./CustomText";
import { HotelSmall } from "./cards/HotelSmall";
import COLORS from "../styles/colors";

export const SmallCardSlider = ({
  style,
  hotels,
  title,
  transparent = false,
}) => {
  return (
    <View style={[styles.catalogueHorizontal, style]}>
      {title ? (
        <CustomText style={styles.catalogueHeader}>{title}</CustomText>
      ) : null}
      <FlatList
        data={hotels}
        horizontal={true}
        renderItem={({ item }) => (
          <HotelSmall
            cardInfo={{
              imgUrl:
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
              price: "2500",
              name: "River Side",
              rating: "4.5",
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
