import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import { connect } from "react-redux";

import { AppLayout } from "../../commons/AppLayout";
import { UserMenuItem } from "./UserMenuItem";
import { UserScreenHeader } from "./UserScreenHeader";
import {
  getUserInfo,
  selectUserName,
  selectUserId,
  selectUserPhotoUrl,
  uploadProfilePhoto,
  logOut,
} from "../../store/auth";
import fb from "../../firebaseConfig";
import COLORS from "../../styles/colors";
import { uploadImage } from "../../store/userInfo.js/uploadImage";
import * as ImagePicker from "expo-image-picker";

import {useSelector} from 'react-redux';

const mapStateToProps = (state) => ({
  userName: selectUserName(state),
  id: selectUserId(state),
  profilePhoto: selectUserPhotoUrl(state),
});

export const UserScreen = connect(mapStateToProps, {
  getUserInfo,
})(
  ({
    getUserInfo,
    id,
    userName,
    profilePhoto,
    navigation,
    uploadProfilePhoto,
  }) => {
    // const imagePath = fb.auth?.currentUser?.photoURL
    //   ? fb.auth.currentUser.photoURL
    //   : "../../assets/images/UserScreen";

    const theme = useSelector(state => state.themeReducer).theme;

    useEffect(() => {
      getUserInfo();
    }, [userName, profilePhoto]);

    const menuItems = [
      {
        icon: "heartFull", //dont edit icon names
        label: "Your Favorites",
        onPressItem: "Favorites",
      },
      {
        icon: "creditCard",
        label: "Payment",
        onPressItem: "Favorites",
      },
      {
        icon: "lifeRing",
        label: "Help",
        onPressItem: "Favorites",
      },
      {
        icon: "piggyBank",
        label: "Promotions",
        onPressItem: "Favorites",
      },
      {
        icon: "setting",
        label: "Settings",
        onPressItem: "SettingsPage",
      },
      {
        icon: "signOut",
        label: "Sign out",
        onPressItem: "Favorites",
      },
    ];

    const profilePicture = fb.auth?.currentUser?.photoURL
      ? fb.auth.currentUser.photoURL
      : require("../../assets/images/UserScreen/profile-picture.png");

    // userName !== fb.auth?.currentUser?.displayName

    // userName !== fb.auth?.currentUser?.displayName
    return false ? (
      <ActivityIndicator
        size="large"
        color={COLORS.pink}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    ) : (
      <AppLayout style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}}>
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
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
