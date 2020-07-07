import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import COLORS from "../styles/colors";
import { HotelLarge } from "./cards/HotelLarge";

export const LargeHotelSlider = ({ hotels, bgColor = "bgcLight", style }) => {
  return (
    <View
      style={[
        styles.catalogueVertical,
        { backgroundColor: COLORS[bgColor] },
        { ...style },
      ]}
    >
      <FlatList
        data={hotels}
        renderItem={({ item }) => (
          <HotelLarge
            cardInfo={{ 
              imgUrl:
                item.images[0],
              price: item.price,
              name: item.hotelName,
              rating: item.hotelRating,
              description: item.description,
              pricing: item.pricing,
              currency: item.currency,
            }}
            style={styles.hotelLargeStyle}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hotelLargeStyle: {
    marginLeft: 20,
    marginRight: 18,
    marginTop: "5%",
    width: "90%",
  },
  catalogueVertical: {
    width: Dimensions.get("window").width,
    marginTop: 39,
    // paddingBottom: 150,
  },
});
