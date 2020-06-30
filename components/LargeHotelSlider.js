import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import COLORS from "../styles/colors";
import { HotelLarge } from "./cards/HotelLarge";

export const LargeHotelSlider = ({ hotels, bgColor = "bgcLight" }) => {
  return (
    <View
      style={[styles.catalogueVertical, { backgroundColor: COLORS[bgColor] }]}
    >
      <FlatList
        data={hotels}
        renderItem={({ item }) => (
          <HotelLarge
            cardInfo={{
              imgUrl:
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
              price: "2500",
              name: "River Side",
              rating: "4.5",
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
    marginTop: 43,
    width: "90%",
  },
  catalogueVertical: {
    width: Dimensions.get("window").width,
    marginTop: 39,
    paddingBottom: 150,
  },
});
