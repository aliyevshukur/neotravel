import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
        title={'Go Reserv'}
      />
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
