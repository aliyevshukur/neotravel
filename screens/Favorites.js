import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CustomText } from "../components";

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
  },
  favoriteCards: {
    height: "90%",
  },
});
