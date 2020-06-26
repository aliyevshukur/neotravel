import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { CustomText } from "../CustomText";
import COLORS from "../../styles/colors";
import { Rating } from "./Rating";

export const HotelSmall = ({ cardInfo, onPress, style }) => {
  const item = cardInfo || {};
  const makeItShort = (value, length, end = " ...") => {
    return value
      ? ((value = value.toString()),
        value.length <= length ? value : value.substring(0, length) + end)
      : null;
  };
  return (
    <TouchableOpacity
      style={[styles.container, { ...style }]}
      onPress={onPress}
    >
      <Rating style={styles.rating} value={item.rating} />
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0.3)",
          "rgba(0, 0, 0, 0.7)",
        ]}
        style={styles.gradient}
      >
        <Image
          resizeMode={"cover"}
          style={styles.bgImg}
          source={{ uri: item.imgUrl }}
        />
        <CustomText style={styles.name}>
          {makeItShort(item.name, 40) || "~"}
        </CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 197,
    height: 117,
    backgroundColor: "transparent",
  },
  rating: {
    position: "absolute",
    right: "0%",
    top: "0%",
  },
  gradient: {
    position: "absolute",
    top: "7.69%",
    width: 197,
    height: 108,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: -1,
    backgroundColor: COLORS.imgLoad,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  name: {
    position: "absolute",
    left: "6.09%",
    right: "6.09%",
    // top: "72.65%",
    bottom: "8.55%",
    fontFamily: "NunitoBold",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 22,
    color: COLORS.white,
  },
});
