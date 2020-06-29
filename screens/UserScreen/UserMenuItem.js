import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { logOut } from "../../store/auth";
import { connect } from "react-redux";

export const UserMenuItem = connect(null, { logOut })(
  ({ icon, label, logOut }) => {
    return (
      <TouchableOpacity onPress={logOut}>
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.icon} source={icon} />
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 35,
  },
  icon: {
    width: 21,
    height: 17,
    marginRight: 14,
  },
});
