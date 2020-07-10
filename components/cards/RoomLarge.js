import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../styles/colors";
import { CustomText } from "../CustomText";
import { CustomSvg } from "./CustomSvg";
import { CustomButton } from "../CustomButton";

export const RoomLarge = ({ style, cardInfo, onSelectPress, onInfoPress }) => {
  // const cardItem = {
  //     name: "Standard King room",
  //     imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
  //     price: "200",
  //     currency: "EU",
  //     time: "3",
  //     features: ["bath", "thermometer", "wifi", "coffee", "coins"],
  // }

  const cardItem = cardInfo || {};
  const makeItShort = (value, length, end = " ...") => {
    return value
      ? ((value = value.toString()),
        value.length <= length ? value : value.substring(0, length) + end)
      : null;
  };

  const DETAILS = Object.freeze({
    coins: {
      id: 1,
      title: "Refundable",
    },
    coffee: {
      id: 2,
      title: "Breakfast included",
    },
    wifi: {
      id: 3,
      title: "Wi-Fi",
    },
    thermometer: {
      id: 4,
      title: "Air Conditioner",
    },
    bath: {
      id: 5,
      title: "Bath",
    },
  });

  return (
    <View style={[style, styles.container]}>
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
          source={{ uri: cardItem.imgUrl }}
        />
      </LinearGradient>
      <View style={styles.cardInfo}>
        <CustomText style={styles.name}>
          {makeItShort(cardItem.name, 40) || "~"}
        </CustomText>
        <View style={styles.details}>
          {cardItem.features?.map((item, index) => (
            <View style={styles.detailItem} key={index}>
              <CustomSvg name={item} style={styles.svg} />
              <CustomText style={styles.detailText}>
                {DETAILS[item].title}
              </CustomText>
            </View>
          ))}
        </View>
      </View>
      <CustomText style={styles.price}>
        {cardItem.currency || "$"}{" "}
        {makeItShort(cardItem.price, 7, "...") || "~"}
      </CustomText>
      <CustomText style={styles.nights}>
        {makeItShort(cardItem.time, 3) || "~"} nights
      </CustomText>
      <View style={styles.selectHolder}>
        <CustomButton
          title={"Select"}
          style={styles.selectBtn}
          onPress={onSelectPress}
        />
      </View>
      <View style={styles.infoHolder}>
        <TouchableOpacity style={styles.infoBtn} onPress={onInfoPress}>
          <CustomSvg
            name={"infoCircle"}
            style={styles.infoSvg}
            gradient={true}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: 185,
    zIndex: -1,
    backgroundColor: COLORS.imgLoad,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  cardInfo: {
    backgroundColor: "white",
    height: 301,
  },
  name: {
    position: "absolute",
    left: 20,
    right: 35,
    top: 15,
    fontFamily: "NunitoBold",
    fontSize: 22,
    fontStyle: "normal",
    lineHeight: 30,
    color: COLORS.blackText,
  },
  details: {
    position: "absolute",
    left: 20,
    top: 73,
    // width: 209.25
  },
  detailItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  svg: {
    width: 20,
    height: 20,
    color: COLORS.grayLight,
  },
  detailText: {
    color: COLORS.grayDark,
    fontSize: 14,
    fontStyle: "normal",
    marginLeft: 15,
  },
  price: {
    position: "absolute",
    left: 20,
    bottom: 45,
    fontFamily: "NunitoBold",
    fontWeight: "800",
    fontSize: 24,
    fontStyle: "normal",
    color: COLORS.darkPriceInCards,
  },
  nights: {
    position: "absolute",
    left: 20,
    bottom: 25,
    color: COLORS.gray,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
  },
  selectHolder: {
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectBtn: {
    width: 185,
    height: 60,
    fontSize: 22,
  },

  infoHolder: {
    position: "absolute",
    right: 15,
    bottom: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBtn: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSvg: {
    width: "100%",
    height: "100%",
  },
});
