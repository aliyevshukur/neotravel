import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import search from "../assets/images/search.png";
import cross from "../assets/images/times.png";
import rectangle from "../assets/images/rectangle.png";
import longRectangle from "../assets/images/longRectangle.png";

export const CustomInput = ({
  long = false,
  isSearch = true,
  isCross = true,
  value,
  setValue,
  placeHolder = "Place",
}) => {
  return (
    <ImageBackground
      source={long ? longRectangle : rectangle}
      style={{ width: long ? 338 : 220, height: 50, marginTop: 10 }}
    >
      <View style={styles.input}>
        {isSearch && (
          <TouchableOpacity>
            <Image source={search} style={styles.search} />
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          onChangeText={(item) => setValue(item)}
          style={styles.textInput}
          placeholder={placeHolder}
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
    height: 50,
    borderRadius: 27,
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
  },
  crossTouchArea: {
    paddingLeft: 5,
  },
});
