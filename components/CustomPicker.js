import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Picker } from "react-native-picker-dropdown";

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
    <Picker
      mode="dropdown"
      selectedValue={pickerValue}
      onValueChange={(itemValue) => setPickerValue(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label={title} itemStyle={{ color: "#999999" }} />
      {pickerArray.map((item) => (
        <Picker.Item key={item.label} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    alignSelf: "center",
    width: 120,
    height: 50,
    backgroundColor: "#E3E6EC",
    borderRadius: 30,
    paddingRight: 0,
  },
});
