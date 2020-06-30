import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import search from "../assets/images/inputComponents/search.png";
import cross from "../assets/images/inputComponents/times.png";
import rectangle from "../assets/images/inputComponents/rectangle.png";
import longRectangle from "../assets/images/inputComponents/longRectangle.png";
import darkRectangle from "../assets/images/inputComponents/darkRectangle.png";

export const CustomInput = ({
  crossButtonHandler,
  style,
  long = false,
  isSearch = true,
  isCross = false,
  dark = false,
  value,
  onChangeText,
  onTouchStart,
  placeholder = "",
  keyboardType = "default",
  maxLength,
  textStyle,
  ...rest
}) => {
  return (
    // <ImageBackground
    //   source={dark ? darkRectangle : long ? longRectangle : rectangle}
    //   style={{ width: long ? 338 : 240, height: 54.5, marginTop: 10 }}
    // >
    <View
      style={[
        styles.input,
        { width: long ? "90%" : "45%", height: 50, marginTop: 20 },
        style,
      ]}
    >
      {isSearch && (
        <TouchableOpacity>
          <Image source={search} style={styles.search} />
        </TouchableOpacity>
      )}
      <TextInput
        {...rest}
        value={value}
        onChangeText={(value) => onChangeText(value)}
        onTouchStart={onTouchStart}
        style={[styles.textInput, { ...textStyle }]}
        placeholder={placeholder}
        placeholderTextColor="#616167"
        keyboardType={keyboardType}
        maxLength={maxLength}
      ></TextInput>
      {(isCross || value !== "") && (
        <TouchableOpacity
          style={styles.crossTouchArea}
          onPress={crossButtonHandler}
        >
          <Image source={cross} style={styles.cross} />
        </TouchableOpacity>
      )}
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 240,
    height: 54.5,
    borderRadius: 28,
    backgroundColor: "#0000",
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  search: {
    width: 16,
    height: 16,
    left: 1,
  },
  cross: {
    width: 11,
    height: 11,
    right: 3,
  },
  textInput: {
    width: "85%",
    paddingHorizontal: 10,
    fontFamily: "NunitoRegular",
    fontSize: 16,
  },
  crossTouchArea: {
    paddingLeft: 5,
  },
});
