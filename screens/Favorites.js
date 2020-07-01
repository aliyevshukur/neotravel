import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomText, LargeHotelSlider } from "../components";
import COLORS from "../styles/colors";
import { hotels } from "./HomeScreen/SearchScreen";

export const Favorites = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.headerTxt}>Favorites</CustomText>
      </View>
      <View style={styles.favoriteCards}>
        <LargeHotelSlider
          hotels={hotels}
          bgColor={"transparent"}
          style={{ marginTop: 0 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    // justifyContent: "flex-start",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: 28,
    color: COLORS.gradientPink,
    // top: "10%",
    // marginBottom: "5%",
  },
  favoriteCards: {
    height: "85%",
  },
});
