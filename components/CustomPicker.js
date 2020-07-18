import React, { useState } from "react";
import { StyleSheet, ImageBackground, Picker, Image, View } from "react-native";

import caretDown from "../assets/images/inputComponents/caret-down.png";
import COLORS from "../styles/colors";

export const CustomPicker = ({
  pickerWidth = 115,
  title = "Guests",
  pickerValue,
  pickerArray = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ],
  onValueChange,
}) => {
  return (
    <View style={{ ...styles.pickerContainer, width: pickerWidth }}>
      <Picker
        mode="dropdown"
        selectedValue={pickerValue}
        onValueChange={(value) => onValueChange(value)}
        style={{ ...styles.picker, width: pickerWidth }}
        itemStyle={{ color: "green" }}
      >
        <Picker.Item label={title} itemStyle={{ color: COLORS.grayDark }} />
        {pickerArray.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
      <Image source={caretDown} style={styles.pickerPng} />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 115,
    height: 54.5,
    marginLeft: 15,
    color: COLORS.grayDark,
    borderRadius: 50,
    paddingRight: 10,
    backgroundColor: "transparent",
  },
  pickerContainer: {
    width: 115,
    height: 54.5,
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 10,
    borderRadius: 50,
    elevation: 2,
    marginTop: 10,
  },
  pickerPng: {
    width: 9.3,
    height: 5.28,
    right: "80%",
    top: "1%",
  },
});
