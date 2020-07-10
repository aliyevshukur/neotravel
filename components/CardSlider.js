import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { CustomText } from "./CustomText";
import COLORS from "../styles/colors";
import { HotelMedium } from "./cards/HotelMedium";

export const CardSlider = ({
  titleStyle,
  hotelsList = [{ id: "1" }, { id: "2" }, { id: "3" }],
  containerStyle,
  title = "any",
}) => {
  console.log("hotelList", hotelsList);

  return (
    <View style={[containerStyle, styles.container]}>
      <CustomText weight="bold" style={[styles.title, titleStyle]}>
        {title}
      </CustomText>
      <FlatList
        style={{ marginBottom: 39 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardSliderContainerStyle}
        data={hotelsList}
        horizontal={true}
        renderItem={({ item }) => (
          <HotelMedium
            cardInfo={
              {
                // imgUrl:
                //   item.images[0],
                // price: item.minPrice,
                // name: item.name,
              }
            }
            style={styles.mediumHotelCard}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    marginLeft: "5%",
    marginBottom: 17,
    textTransform: "capitalize",
  },
  mediumHotelCard: {
    marginRight: 20,
  },
  cardSliderContainerStyle: {
    marginLeft: "5%",
    marginRight: "5%",
  },
});
