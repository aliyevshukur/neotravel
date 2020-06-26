import React, { useState } from "react";
import { StyleSheet, ImageBackground, Picker, Image } from "react-native";

import dropdown from "../assets/images/inputComponents/dropdown.png";
import darkDropdown from "../assets/images/inputComponents/darkDropdown.png";
import caretDown from "../assets/images/inputComponents/caret-down.png";

export const CustomPicker = ({
  title = "Guests",
  dark = false,
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
    <ImageBackground
      source={dark ? darkDropdown : dropdown}
      style={{
        width: 130,
        height: 65,
        marginTop: 10,
        paddingLeft: 7,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
      }}
    >
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
      <Image
        source={caretDown}
        style={{ width: 9.3, height: 5.28, right: 50 }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 120,
    height: 60,
    marginLeft: 15,
    backgroundColor: "transparent",
    color: "#999999",
    borderRadius: 50,
  },
});
