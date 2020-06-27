import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ToggleButton } from "../components/ToggleButton";

export function SecondScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
