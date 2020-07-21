import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { connect, useSelector } from "react-redux";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";
import image from "../../assets/images/notfBg.png";
import Constants from "expo-constants";
import { NotfCard } from "./NotfCard";
import { FlatList } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import fb from "../../firebaseConfig";
import {
  getNotifications,
  getNotificationsFB,
  getNotificationsLoading,
} from "../../store/notification";
import { LoadingScreen } from "../../commons/LoadingScreen";

const mapStateToProps = (state) => ({
  notifications: getNotifications(state),
  loading: getNotificationsLoading(state),
});

export const NotificationScreen = connect(mapStateToProps, {
  getNotificationsFB,
})(({ navigation, notifications, getNotificationsFB, loading }) => {
  const currentUserId = fb.auth.currentUser.uid;
  const theme = useSelector((state) => state.themeReducer).theme;
  const searchRoomHandler = () => {
    navigation.navigate("SearchStack");
  };

  useEffect(() => {
    getNotificationsFB(currentUserId);
  }, []);
  console.log("notfs", notifications);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.contentWrapper}>
            <CustomText weight="bold" style={styles.primaryHeader}>
              Special Deals
            </CustomText>
            <CustomText weight="bold" style={styles.dateText}>
              Nov 12 - 24{" "}
            </CustomText>
            <CustomButton
              onPress={searchRoomHandler}
              title={"Search a hotel"}
              style={styles.searchBtn}
            />
          </View>
        </ImageBackground>
      </View>
      {!loading ? (
        <FlatList
          contentContainerStyle={styles.notfList}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          )}
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return <NotfCard content={item.content} key={index} />;
          }}
        />
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  notfList: {
    // flex: 1,
    alignItems: "stretch",
    // marginTop: 200,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    marginTop: Constants.statusBarHeight,
  },
  imageWrapper: {
    width: Dimensions.get("window").width,
    // flex: 1,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.white,
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
  noNotfWrapper: {
    alignItems: "center",
    paddingTop: 40,
  },
});
