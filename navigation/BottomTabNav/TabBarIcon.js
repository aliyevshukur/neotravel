import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const TabBarIcon = ({ isActive, image }) => (
  <View style={isActive ? styles.activeContainer : styles.container}>
    <Image source={image} />
  </View>
);

const styles = StyleSheet.create({
  activeContainer: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    padding: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  container: {},
});
