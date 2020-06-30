import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomText } from "./CustomText";
import COLORS from "../styles/colors";

export const CustomButton = ({ title = "Search a room", style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.gradientOrange, COLORS.gradientPink]}
        style={{ flex: 1, borderRadius: 50 }}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 0.4, 1]}
      >
        <View style={styles.btnContainer}>
          <CustomText style={{ ...styles.btnText, fontSize: style?.fontSize }}>
            {title}
          </CustomText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 70,
    borderRadius: 50,
    elevation: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: "NunitoBold",
  },
});
