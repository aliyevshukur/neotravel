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
  ({ hotels, bgColor, style, addHotel, favorites, onItemPress }) => {
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
            return (
              <HotelLarge
                cardInfo={{
                  imgUrl: item.images[0],
                  price: item.minPrice,
                  name: item.name,
                  rating: item.rating,
                  city: item.city,
                  street: item.street,
                  hotelID: item.id,
                  isLiked: favorites.includes(item.id),
                }}
                style={styles.hotelLargeStyle}
                onPress={() => onItemPress(item)}
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
    width: "90%",
  },
  catalogueVertical: {
    width: Dimensions.get("window").width,
    marginTop: 39,
  },
});
