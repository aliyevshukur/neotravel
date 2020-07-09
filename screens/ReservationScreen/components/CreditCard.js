import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import visaLogo from "../../../assets/images/ReservationScreen/visa-logo.png";
import cardLogo from "../../../assets/images/ReservationScreen/card-logo.png";

export const CreditCard = ({ cardNumber, name, CVV }) => {
  const renderCardNumbers = () => {
    const segments = cardNumber.match(/.{1,4}/g) || [];
    const result = segments.map((text, ind) => (
      <Text style={[styles.cardText, { marginRight: 5 }]} key={ind}>
        {text}
      </Text>
    ));
    return result;
  };

  return (
    <LinearGradient
      colors={["#FF6161", "#FF61DC"]}
      style={styles.creditCard}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.circle} />
      <View style={styles.cardLogos}>
        <Image source={cardLogo} style={{ width: 42, height: 30 }} />
        <Image source={visaLogo} style={{ width: 75, height: 24 }} />
      </View>
      <View style={styles.cardNumberWrapper}>{renderCardNumbers()}</View>
      <View style={styles.cardBottom}>
        <Text style={styles.cardText}>{name}</Text>
        <Text style={styles.cardText}>{CVV}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  creditCard: {
    justifyContent: "space-between",
    height: Dimensions.get('window').height*0.26,
    maxHeight: 210,
    width: Dimensions.get('window').width*0.9,
    borderRadius: 15,
    padding: 25,
    position: "relative",
    overflow: "hidden",
  },
  circle: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    width: 316,
    height: 316,
    borderRadius: 316 / 2,
    opacity: 0.1,
    left: -150,
    top: "-25%",
  },
  cardLogos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  cardNumberWrapper: {
    flexDirection: "row",
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 24,
    textTransform: "uppercase",
  },
  cardBottom: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
