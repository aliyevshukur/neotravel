import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { CustomText, LargeHotelSlider } from "../components";
import COLORS from "../styles/colors";
import { hotels } from "./HomeScreen/SearchScreen";
import { LinearGradient } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export const Favorites = () => {
  return (
    <View style={styles.container}>
      <View>
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    width: "100%",
    paddingTop: 50,
  },

  headerTxt: {
    fontSize: 28,
    color: COLORS.gradientPink,
    // top: "10%",
    // marginBottom: "5%",
  },
  // favoriteCards: {
  //   height: "85%",
  // },
  gradientHeader: {
    position: "absolute",
    top: -880,
    left: -(1000 - screenWidth) / 2,
    width: 1000,
    height: 1000,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    elevation: 5,
    zIndex: -1,
  },
});
