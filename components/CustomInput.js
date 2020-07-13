import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";

import search from "../assets/images/inputComponents/search.png";
import cross from "../assets/images/inputComponents/times.png";
import rectangle from "../assets/images/inputComponents/rectangle.png";
import longRectangle from "../assets/images/inputComponents/longRectangle.png";
import darkRectangle from "../assets/images/inputComponents/darkRectangle.png";
import COLORS from "../styles/colors";
import { CustomSvg } from "./cards/CustomSvg";

export const CustomInput = ({
  style,
  long = false,
  isSearch = true,
  isCross = true,
  dark = false,
  value,
  onChangeText,
  onTouchStart,
  placeholder = "",
  keyboardType = "default",
  maxLength,
  textStyle,
  secureTextEntry,
  ...rest
}) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  const crossBtnHandler = () => {
    onChangeText("");
  };

  return (
    // <ImageBackground
    //   source={dark ? darkRectangle : long ? longRectangle : rectangle}
    //   style={{ width: long ? 338 : 240, height: 54.5, marginTop: 10 }}
    // >
    <View
      style={[
        styles.input,
        { width: long ? "90%" : "60%", height: 54.5, marginTop: 10 },
        style,
      ]}
    >
      {isSearch && (
        <TouchableOpacity>
          <CustomSvg name={"search"} style={styles.search} />
        </TouchableOpacity>
      )}
      <TextInput
        {...rest}
        value={value}
        onChangeText={(value) => onChangeText(value)}
        onTouchStart={onTouchStart}
        style={[
          styles.textInput,
          {
            ...textStyle,
            color: theme == "light" ? COLORS.blackText : COLORS.white,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#616167"
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      ></TextInput>
      {isCross && value !== "" && (
        <TouchableOpacity
          style={styles.crossTouchArea}
          onPress={crossBtnHandler}
        >
          <CustomSvg name={"times"} style={styles.cross} />
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
    color: COLORS.gray,
    opacity: 0.5,
  },
  cross: {
    width: 14,
    height: 14,
    right: 3,
    color: COLORS.gray,
    opacity: 0.5,
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
