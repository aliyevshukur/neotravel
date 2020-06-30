import React, { useState } from "react";
import { View, Picker, StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../styles/colors";

export const PrimarySearch = () => {
  return (
    <View style={styles.pickerContainer}>
      <Picker style={styles.picker} mode="dropdown">
        <Picker.Item
          label={"SF, USA - 2 guests - Jan 18 to Jan 23"}
          value={"1"}
        />
        <Picker.Item
          label={"SF, USA - 3 guests - Jan 20 to Jan 25"}
          value={"2"}
        />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: Dimensions.get("window").width,
    height: 55,
    fontFamily: "NunitoRegular",
    fontSize: 40,
  },
  pickerContainer: {
    elevation: 2,
    backgroundColor: COLORS.bgcLight,
  },
});
