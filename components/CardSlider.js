import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomText } from "./CustomText";
import COLORS from "../styles/colors";

export const CardSlider = ({
  titleStyle,
  hotelList,
  containerStyle,
  title = "any",
}) => {
  return (
    <View style={[containerStyle, styles.container]}>
      <CustomText weight="bold" style={[styles.title, titleStyle]}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 22,
  },
});
