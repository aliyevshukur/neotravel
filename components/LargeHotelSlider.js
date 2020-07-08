import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { useSelector, connect } from "react-redux";

import COLORS from "../styles/colors";
import { HotelLarge } from "./cards/HotelLarge";

// const mapStateToProps = state => ({
//   favorite:
// })

export const LargeHotelSlider = ({ hotels, bgColor, style, addHotel }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <View
      style={[
        styles.catalogueVertical,
        {
          backgroundColor:
            COLORS[bgColor] ||
            (theme == "light" ? COLORS.bgcLight : COLORS.bgcDark),
        },
        { ...style },
      ]}
    >
      <FlatList
        data={hotels}
        renderItem={({ item }) => (
          <HotelLarge
            cardInfo={{
              imgUrl: item.images[0],
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
