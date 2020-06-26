import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { shadow } from "../../styles/commonStyles";
import COLORS from "../../styles/colors";

export const TabBarIcon = ({ isActive, image }) => (
  <View style={isActive ? styles.activeContainer : styles.container}>
    <Image source={image} />
  </View>
);

const styles = StyleSheet.create({
  activeContainer: {
    ...shadow,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.bgcLight,
    elevation: 20,
  },
  container: {},
});
