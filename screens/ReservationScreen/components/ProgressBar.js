import React from "react";
import { StyleSheet, View, Text } from "react-native";

import COLORS from "../../../styles/colors";

export const ProgressBar = ({ activeNumber, style }) => {
  // Returns n number of circles with corresponding labels from 1 to n
  const renderCircles = (n = 3) => {
    // Array of JSX elements
    let circles = [];
    let circleStyle;

    for (let i = 1; i <= n; i++) {
      // Set margin to elements with even number
      circleStyle = {};
      if (i % 2 === 0)
        circleStyle = {
          marginHorizontal: 25,
        };

      const isActive = activeNumber >= i;
      const activeCircleStyle = {
        marginRight: i != n ? 24 : 0,
        backgroundColor: !isActive ? COLORS.offWhite : COLORS.grayLight,
      };
      const activeLineStyle = { color: isActive ? "#FF619F" : COLORS.gray };
      const activeLabelStyle = {
        backgroundColor: isActive ? "#FF619F" : COLORS.gray,
      };

      circles.push(
        <View style={[styles.circle, { ...activeCircleStyle }]} key={i}>
          <Text style={[styles.label, { ...activeLineStyle }]}>{i}</Text>
          {i != n && <View style={[styles.line, { ...activeLabelStyle }]} />}
        </View>
      );
    }

    return circles;
  };

  return <View style={[styles.container, style]}>{renderCircles(3)}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    opacity: 1,
    elevation: 10,
  },
  line: {
    width: 24,
    height: 2,
    position: "absolute",
    top: "50%",
    right: -24,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
