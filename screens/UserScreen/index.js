import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppLayout } from "../../commons/AppLayout";
import { UserMenuItem } from "./UserMenuItem";
import { UserScreenHeader } from "./UserScreenHeader";

export const UserScreen = () => {
  const imagePath = "../../assets/images/UserScreen";

  const menuItems = [
    {
      icon: require(`${imagePath}/heart.png`),
      label: "Your Favorites",
    },
    {
      icon: require(`${imagePath}/card.png`),
      label: "Payment",
    },
    {
      icon: require(`${imagePath}/help.png`),
      label: "Help",
    },
    {
      icon: require(`${imagePath}/promotions.png`),
      label: "Promotions",
    },
    {
      icon: require(`${imagePath}/settings.png`),
      label: "Settings",
    },
  ];

  const profilePicture = require("../../assets/images/UserScreen/profile-picture.png");

  return (
    <AppLayout style={styles.container}>
      <View>
        {/* User profile picture and name */}
        <UserScreenHeader
          profilePicture={profilePicture}
          fullName={"Jane Doe"}
        />
        {menuItems.map(({ icon, label, i }) => {
          return <UserMenuItem icon={icon} label={label} key={i} />;
        })}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  }
});
