import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { AppLayout } from "../../commons/AppLayout";
import { UserMenuItem } from "./UserMenuItem";
import { UserScreenHeader } from "./UserScreenHeader";
import {
  getUserInfo,
  selectUserName,
  selectUserPhotoUrl,
} from "../../store/auth";
import fb from "../../firebaseConfig";
import COLORS from "../../styles/colors";

import { useSelector } from "react-redux";
import { LoadingScreen } from "../../commons/LoadingScreen";

const mapStateToProps = (state) => ({
  userName: selectUserName(state),
  profilePhoto: selectUserPhotoUrl(state),
});

export const UserScreen = connect(mapStateToProps, {
  getUserInfo,
})(({ getUserInfo, userName, profilePhoto, navigation }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  // Data of user menu items
  const menuItems = [
    {
      icon: "heartFull",
      label: "Your Favorites",
      onPressItem: "favorites",
    },
    {
      icon: "reservations",
      label: "Reservations",
      onPressItem: "payments",
    },
    {
      icon: "lifeRing",
      label: "Help",
      onPressItem: "help",
    },
    {
      icon: "setting",
      label: "Settings",
      onPressItem: "settings",
    },
    {
      icon: "signOut",
      label: "Sign out",
      onPressItem: "favorites",
    },
  ];

  useEffect(() => {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        getUserInfo();
      }
    });
  }, []);

  // if (
  //   profilePhoto &&
  //   (fb?.auth?.currentUser?.photoURL !== profilePhoto ||
  //     fb?.auth?.currentUser?.displayName !== userName)
  // ) {
  //   return <LoadingScreen />;
  // }

  return (
    <AppLayout
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View>
        {/* User profile picture and name */}
        <UserScreenHeader profilePicture={profilePhoto} fullName={userName} />
        {menuItems.map(({ icon, label, onPressItem }, i) => {
          return (
            <UserMenuItem
              icon={icon}
              label={label}
              key={i}
              navigation={navigation}
              onPressItem={onPressItem}
            />
          );
        })}
      </View>
    </AppLayout>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
