import React, { useState } from "react";
import { StyleSheet, ImageBackground, Picker, Image, View } from "react-native";

import caretDown from "../assets/images/inputComponents/caret-down.png";
import COLORS from "../styles/colors";

export const CustomPicker = ({
  title = "Guests",
  pickerValue,
  setPickerValue,
  pickerArray = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ],
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        mode="dropdown"
        selectedValue={pickerValue}
        onValueChange={(itemValue) => setPickerValue(itemValue)}
        style={styles.picker}
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
    width: 120,
    height: 50,
    marginLeft: 15,
    color: COLORS.grayDark,
    borderRadius: 50,
    padding: 0,
  },
  pickerContainer: {
    width: 120,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 50,
    elevation: 2,
    marginTop: 10,
  },
  pickerPng: {
    width: 9.3,
    height: 5.28,
    right: 40,
  },
});
