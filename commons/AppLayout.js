import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import COLORS from "../styles/colors";

export const AppLayout = ({ children, style }) => {
  return <View style={[layoutStyles.container, style]}>{children}</View>;
};

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: COLORS.bgcLight,
    paddingTop: StatusBar.currentHeight,
  },
});
