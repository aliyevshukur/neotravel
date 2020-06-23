import React, { useState } from "react";
import { StyleSheet, ImageBackground, Picker, Image } from "react-native";

import dropdown from "../assets/images/dropdown.png";
import caretDown from "../assets/images/caret-down.png";

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
    <ImageBackground
      source={dropdown}
      style={{
        width: 100,
        height: 50,
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
        style={{ width: 9.3, height: 5.28, right: 35 }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 100,
    height: 50,
    backgroundColor: "transparent",
    color: "#999999",
    borderRadius: 50,
  },
});
