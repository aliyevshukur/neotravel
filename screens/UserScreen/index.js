import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { AppLayout } from "../../commons/AppLayout";
import { UserMenuItem } from "./UserMenuItem";
import { UserScreenHeader } from "./UserScreenHeader";
import {
  getUserInfo,
  selectUserName,
  selectUserId,
  selectUserPhotoUrl,
} from "../../store/auth";
import fb from "../../firebaseConfig";
import COLORS from "../../styles/colors";
import profileDefault from "../../assets/images/profileDefault.png";

const mapStateToProps = (state) => ({
  userName: selectUserName(state),
  id: selectUserId(state),
  profilePhoto: selectUserPhotoUrl(state),
});

export const UserScreen = connect(mapStateToProps, {
  getUserInfo,
})(({ getUserInfo, userName, profilePhoto, navigation }) => {
  const haveProfilePhoto = !!fb?.auth?.currentUser?.photoURL;

  useEffect(() => {
    getUserInfo();
  }, []);

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

  return (
    <>
      {fb?.auth?.currentUser?.photoURL &&
        (fb?.auth?.currentUser?.photoURL !== profilePhoto ||
          fb?.auth?.currentUser?.displayName !== userName) && (
          <ActivityIndicator
            size="large"
            color={COLORS.pink}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      <AppLayout style={styles.container}>
        <View>
          {/* User profile picture and name */}
          <UserScreenHeader
            profilePicture={haveProfilePhoto ? profilePhoto : profileDefault}
            fullName={userName}
          />
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
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
