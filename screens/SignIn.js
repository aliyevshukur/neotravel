import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>SignIn</Text>
      <Button
        title="go HomePage"
        onPress={() => navigation.push("BottomTabNav")}
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
