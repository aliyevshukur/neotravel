import React from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";

import { shadow } from "../../styles/commonStyles";
import { CustomText } from "../../components";
import COLORS from "../../styles/colors";

export const UserScreenHeader = ({ profilePicture, fullName, userName }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profilePicture} source={profilePicture} />
      <CustomText style={styles.userName}>{fullName}</CustomText>
    </View>
  );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 11,
    alignItems: "center",
    width: width + 10,
    backgroundColor: COLORS.grayLight,
    elevation: 5
  },
  profilePicture: {
    borderRadius: 50,
    marginRight: 33,
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 22,
    fontFamily: "NunitoBold",
  },
});
