import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { CachedImage } from 'react-native-cached-image';

import { CustomText } from "../CustomText";
import COLORS from "../../styles/colors";
import { Rating } from "./Rating";

//https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80

export const HotelMedium = ({ cardInfo, onPress, style }) => {
  const item = cardInfo || {};
  const makeItShort = (value, length, end = " ...") => {
    return value
      ? ((value = value.toString()),
        value.length <= length ? value : value.substring(0, length) + end)
      : null;
  };

  const imageURL =
    item.imgUrl.slice(0, item.imgUrl.indexOf("?")) + "?w=1.0&q=5";
  console.log(imageURL);

  const [loaded, setLoaded] = useState(false);

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
        {!loaded && (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator
              size="large"
              color={COLORS.pink}
              style={styles.loader}
            />
          </View>
        )}
        <Image
          resizeMode={"cover"}
          style={styles.bgImg}
          source={{ uri: imageURL }}
          onLoad={() => setLoaded(true)}
        />
        <CustomText style={styles.name}>
          {makeItShort(item.name, 30) || "~"}
        </CustomText>
        <CustomText style={styles.place}>
          {makeItShort(item.place, 20) || "~"}
        </CustomText>
        <CustomText style={styles.price}>
          {makeItShort(item.currency, 3) || "$"} {item.price || "~"}
        </CustomText>
        <Rating
          style={styles.rating}
          value={item.rating}
          starColor={"rgba(255, 255, 255, 0.5)"}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 265,
    height: 185,
    borderRadius: 20,
    backgroundColor: COLORS.imgLoad,
    overflow: "hidden",
  },
  gradient: {
    width: 265,
    height: 185,
    zIndex: -1,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  name: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 38,
    fontFamily: "NunitoBold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 22,
    color: COLORS.white,
  },
  place: {
    position: "absolute",
    width: 150,
    height: 19,
    left: 15,
    top: 152,
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 19,
    color: COLORS.white,
  },
  price: {
    position: "absolute",
    left: 150,
    right: 50,
    top: 155,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 16,
    color: COLORS.white,
  },
  rating: {
    position: "absolute",
    left: 213,
    top: 150,
    backgroundColor: "transparent",
  },
  loaderWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  loader: {
    position: "relative",
    top: "-50%",
    left: "-50%",
  },
});
