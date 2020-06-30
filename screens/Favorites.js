import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { CustomText } from "../components";
import COLORS from "../styles/colors";

export const Favorites = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.headerTxt}>Favorites</CustomText>
      </View>
      <View style={styles.favoriteCards}></View>
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
    justifyContent: "flex-start",
    elevation: 2,
  },
  headerTxt: {
    fontSize: 28,
    fontFamily: "NunitoBold",
    color: COLORS.pink,
  },
  favoriteCards: {
    height: "90%",
  },
});
