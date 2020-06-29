import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomSvg } from "../../components";

export const UserMenuItem = ({ icon, label }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.icon}>
          <CustomSvg name={icon} gradient={true} style={styles.svg}/>
        </View>
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
    height: 17,
    width: 21,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
});
