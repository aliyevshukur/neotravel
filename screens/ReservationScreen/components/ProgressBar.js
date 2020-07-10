import React from "react";
import { StyleSheet, View} from "react-native";
import {useSelector} from 'react-redux';

import COLORS from "../../../styles/colors";
import { CustomText } from "../../../components";


export const ProgressBar = ({ activeNumber, style }) => {

  const theme = useSelector(state => state.themeReducer).theme;
  const activeBg = theme=="light" ? COLORS.lightProgress : COLORS.darkProgress,
  passiveBg = theme=="light" ? COLORS.bgcLight : COLORS.bgcDark,
  passiveNumber= theme=="light" ? COLORS.grayDark : COLORS.gray,
  passiveLabel= theme=="light" ? COLORS.gray : COLORS.grayDark;

  // Returns n number of circles with corresponding labels from 1 to n
  const renderCircles = (n = 4) => {
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
        backgroundColor: !isActive ? activeBg : passiveBg,
      };
      const activeLineStyle = { color: isActive ? "#FF619F" : passiveNumber };
      const activeLabelStyle = {
        backgroundColor: isActive ? "#FF619F" : passiveLabel,
      };

      circles.push(
        <View style={[styles.circle, { ...activeCircleStyle }]} key={i}>
          <CustomText style={{...styles.label, ...activeLineStyle }}>{i}</CustomText>
          {i != n && <View style={[styles.line, { ...activeLabelStyle }]} />}
        </View>
      );
    }

    return circles;
  };

  return <View style={[styles.container, style]}>{renderCircles(4)}</View>;
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
    elevation: 5,
  },
  line: {
    width: 24,
    height: 2,
    position: "absolute",
    top: "50%",
    right: -24,
  },
  label: {
    fontFamily: "NunitoBold",
    fontSize: 18,
  },
});
