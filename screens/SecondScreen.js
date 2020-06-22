import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text>SecondScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
