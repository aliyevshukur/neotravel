import React from "react";
import { StyleSheet, TextInput, Image, View } from "react-native";

import search from "../assets/search.png";
import cross from "../assets/times.png";

export const CustomInput = ({
  width = "80%",
  isSearch = true,
  isCross = false,
}) => {
  return (
    <View style={[styles.input, { width: width }]}>
      {isSearch ? <Image source={search} style={styles.search} /> : null}
      <TextInput style={styles.textInput} placeholder="Place"></TextInput>
      {isCross ? <Image source={cross} style={styles.cross} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 10,
    elevation: 5,
    borderRadius: 27,
    backgroundColor: "#E6E9EF",
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
    right: 7,
  },
  textInput: {
    width: "90%",
    paddingHorizontal: 10,
  },
});
