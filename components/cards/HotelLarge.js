import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../styles/colors";
import { CustomText } from "../CustomText";
import { Rating } from "./Rating";
import { CustomSvg } from "./CustomSvg";

export const HotelLarge = ({
  cardInfo,
  isLiked,
  isMinimal,
  onPress,
  onLikePress,
  style,
}) => {
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
        <TouchableOpacity style={styles.heartHolder} onPress={onLikePress}>
          <CustomSvg
            name={isLiked ? "heartFull" : "heartEmpty"}
            style={styles.heart}
          />
        </TouchableOpacity>
        <CustomText style={styles.name}>
          {makeItShort(item.name, 40) || "~"}
        </CustomText>
        <Rating style={styles.rating} value={item.rating} />
      </LinearGradient>
      {isMinimal ? null : (
        <View style={styles.cardInfo}>
          <CustomText style={styles.loaction}>
            {makeItShort(item.city, 30) || "~"}
          </CustomText>
          <CustomText style={styles.pricing}>
            {makeItShort(item.street, 25) || "~"}
          </CustomText>
          <CustomText style={styles.price}>
            {makeItShort(item.currency, 3) || "$"} {item.price || "~"}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },
  container: {
    width: "100%",
    // width: 338,
    backgroundColor: COLORS.imgLoad,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    // width: 338,
    height: 185,
    zIndex: -1,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  heartHolder: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  heart: {
    width: 26,
    height: 26,
  },
  name: {
    position: "absolute",
    left: 15,
    right: 80,
    bottom: 15,
    fontFamily: "NunitoBold",
    fontSize: 22,
    fontStyle: "normal",
    lineHeight: 30,
    color: COLORS.white,
  },
  rating: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  price: {
    position: "absolute",
    right: 15,
    bottom: 15,
    fontFamily: "NunitoBold",
    fontWeight: "800",
    fontSize: 24,
    fontStyle: "normal",
    color: COLORS.darkPriceInCards,
  },
  cardInfo: {
    backgroundColor: "white",
    height: 104,
  },
  loaction: {
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.gray,
    marginLeft: 15,
    marginTop: 15,
  },
  description: {
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.blackText,
    marginLeft: 15,
    marginTop: 15,
  },
  pricing: {
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.blackText,
    marginLeft: 15,
  },
});
