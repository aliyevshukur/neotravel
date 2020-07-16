import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import visaLogo from "../../../assets/images/ReservationScreen/visa-logo.png";
import cardLogo from "../../../assets/images/ReservationScreen/card-logo.png";
import { CustomText } from "../../../components";
import cvvBackground from "../../../assets/images/ReservationScreen/cvvBackground.png";

export const CreditCardBack = ({ CVV }) => {
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
        <Image
          source={visaLogo}
          style={{ width: 75, height: 24, alignSelf: "flex-end" }}
        />
      </View>
      <ImageBackground
        source={cvvBackground}
        style={{
          width: "85%",
          height: "50%",
          alignItems: "flex-end",
        }}
      >
        <CustomText style={styles.cvvText}>{CVV}</CustomText>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  creditCard: {
    justifyContent: "space-between",
    height: 198,
    // height: Dimensions.get('window').height*0.27,
    // maxHeight: 250,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 15,
    padding: 25,
    position: "relative",
    overflow: "hidden",
  },
  ccvContainer: {
    width: "65%",
    height: "20%",
    alignItems: "flex-end",
    // justifyContent: "center",
    paddingRight: "2%",
    marginBottom: "15%",
  },
  cvvText: {
    fontSize: 20,
    fontFamily: "NunitoRegular",
    color: "white",
    marginRight: "20%",
    marginTop: "2%",
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
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 19,
    textTransform: "uppercase",
  },
  cardBottom: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
