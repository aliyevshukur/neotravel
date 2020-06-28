import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import { CustomText } from "../../../components/CustomText";
import { HotelSmall } from "../../../components/cards/HotelSmall";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import COLORS from "../../../styles/colors";

export const ListViewSearch = ({ hotels }) => {
  return (
    <>
      <View style={styles.catalogueHorizontal}>
        <CustomText style={styles.catalogueHeader}>Near the beaches</CustomText>
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
      <View style={styles.catalogueVertical}>
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
              style={{
                marginLeft: 20,
                marginRight: 18,
                marginTop: 43,
                width: "90%",
              }}
              key={item.id}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  catalogueHorizontal: {
    height: 180,
  },
  catalogueVertical: {
    width: Dimensions.get("window").width,
    backgroundColor: COLORS.bgcDark,
    marginTop: 39,
    paddingBottom: 150,
  },
  catalogueHeader: {
    fontFamily: "NunitoBold",
    fontSize: 22,
    color: COLORS.blackText,
    marginLeft: 21,
    marginBottom: 12,
    marginTop: 17,
  },
  smallHotelCard: {
    marginLeft: 18,
  },
});
