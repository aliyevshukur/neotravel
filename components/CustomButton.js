import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomText } from "./CustomText";
export const CustomButton = ({
  title = "Search a room",
  width = "80%",
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { width: width }, style]}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#FF6161", "#FF61DC"]}
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
    color: "white",
    fontFamily: "NunitoBold",
  },
});
