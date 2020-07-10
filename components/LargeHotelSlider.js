import React, { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { useSelector, connect } from "react-redux";

import COLORS from "../styles/colors";
import { HotelLarge } from "./cards/HotelLarge";
import { selectFavorites } from "../store/favorites";

const mapStateToProps = (state) => ({
  favorites: selectFavorites(state),
});

export const LargeHotelSlider = connect(mapStateToProps)(
  ({ hotels, bgColor, style, addHotel, favorites }) => {
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
          renderItem={({ item }) => {
            const isLiked = favorites.includes(item.id);
            console.log(item.price + " " + item.name + " " + item.images[0]);
            return (
              <HotelLarge
                cardInfo={{
                  imgUrl: item.images[0],
                  price: item.maxPrice,
                  name: item.name,
                  rating: item.rating,
                  description: item.description,
                  location: item.city,
                  description: item.street,
                  pricing: item.pricing,
                  currency: item.currency,
                  hotelID: item.hotelID,
                  id: item.id,
                  isLiked: favorites.includes(item.id),
                }}
                style={styles.hotelLargeStyle}
                key={item.id}
              />
            );
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  hotelLargeStyle: {
    marginLeft: 20,
    marginRight: 18,
    marginTop: "5%",
    marginBottom: 100,
    width: "90%",
  },
  catalogueVertical: {
    width: Dimensions.get("window").width,
    marginTop: 39,
    // paddingBottom: 150,
  },
});
