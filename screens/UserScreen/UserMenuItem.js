import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const UserMenuItem = ({ icon, label }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.icon} source={icon} />
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 35,
  },
  icon: {
    marginRight: 14,
  },
});
