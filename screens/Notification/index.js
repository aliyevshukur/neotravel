import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";
import image from "../../assets/images/notfBg.png";
import Constants from "expo-constants";
import { NotfCard } from "./NotfCard";
import { ScrollView } from "react-native-gesture-handler";

const notifications = [
  { description: "Please rate your stay at Venice Royal, Venice, Italy. " },
  { description: "Your stay at Hotel Venice Royal is booked in 2 days! " },
  {
    description:
      "You have earned 3000 loyalty points! See how to use them here. ",
  },
];

export const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.contentWrapper}>
            <CustomText weight="bold" style={styles.primaryHeader}>
              Special Deals
            </CustomText>
            <CustomText weight="bold" style={styles.dateText}>
              Nov 12 - 24{" "}
            </CustomText>
            <CustomButton title="Search a room" style={styles.searchBtn} />
          </View>
        </ImageBackground>
      </View>
      {/* <ScrollView>
        {notifications.map((notf, ind) => (
          <NotfCard item={notf} isLast={notifications.length === ind} />
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  imageWrapper: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
  image: {
    alignItems: "center",
  },
  searchBtn: {
    width: "100%",
    fontSize: 24,
    marginBottom: 45,
  },
  primaryHeader: {
    marginTop: 37,
    fontSize: 32,
    color: COLORS.white,
    paddingBottom: 6,
  },
  dateText: {
    color: "rgba( 255, 255 ,255 , 0.8 )",
    fontSize: 18,
    paddingBottom: 19,
  },
  contentWrapper: {
    width: "75%",
    color: "rgba(0, 0, 0, 0.5)",
  },
});
