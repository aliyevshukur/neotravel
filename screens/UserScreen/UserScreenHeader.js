import React from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";

import { shadow } from "../../styles/commonStyles";
import { CustomText } from "../../components";
import COLORS from "../../styles/colors";
import fb from "../../firebaseConfig";

import {useSelector} from 'react-redux';

export const UserScreenHeader = ({ profilePicture, fullName, userName }) => {
  // const isPicture = fb.auth.currentUser.photoURL !== null;

const theme = useSelector(state => state.themeReducer).theme;

  return (
    <View style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}}>
      <Image
        style={styles.profilePicture}
        source={{ uri: fb?.auth?.currentUser?.photoURL }}
      />
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
    backgroundColor: COLORS.bgcLight,
    elevation: 5,
    marginTop: 7,
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
    color: COLORS.blackText,
  },
});
