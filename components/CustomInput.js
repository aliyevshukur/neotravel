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
  style,
  long = false,
  isSearch = true,
  isCross = true,
  dark = false,
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  maxLength,
}) => {
  return (
    <ImageBackground
      source={dark ? darkRectangle : long ? longRectangle : rectangle}
<<<<<<< HEAD
      style={[
        { width: long ? 338 : 240, height: 54.5, marginTop: 10 },
        { style },
      ]}
=======
      style={{ width: long ? 338 : 240, height: 54.5, marginTop: 10 }}
>>>>>>> fcf6ddcc50bcbcb6c078f3b205a2b541ed15ca09
    >
      <View style={styles.input}>
        {isSearch && (
          <TouchableOpacity>
            <Image source={search} style={styles.search} />
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#616167"
          keyboardType={keyboardType}
          maxLength={maxLength}
        ></TextInput>
        {isCross && (
          <TouchableOpacity
            style={styles.crossTouchArea}
            onPress={() => {
              setValue("");
            }}
          >
            <Image source={cross} style={styles.cross} />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 240,
    height: 54.5,
    borderRadius: 28,
    backgroundColor: "transparent",
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
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
