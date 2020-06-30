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
            cardInfo={{
              imgUrl:
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
              price: "2500",
              name: "River Side",
            }}
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
