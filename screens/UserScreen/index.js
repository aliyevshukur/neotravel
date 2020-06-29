import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { AppLayout } from "../../commons/AppLayout";
import { UserMenuItem } from "./UserMenuItem";
import { UserScreenHeader } from "./UserScreenHeader";
import { getUserName, selectUserName } from "../../store/auth";

const mapStateToProps = (state) => ({
  userName: selectUserName(state),
});

  
export const UserScreen = connect(mapStateToProps, { getUserName })(
  ({ getUserName, userName }) => {
    const imagePath = "../../assets/images/UserScreen";
    useEffect(() => {
      getUserName;
    }, []);
    const menuItems = [
      {
        icon: "heartFull", //dont edit icon names
        label: "Your Favorites",
      },
      {
        icon: "creditCard",
        label: "Payment",
      },
      {
        icon: "lifeRing",
        label: "Help",
      },
      {
        icon: "piggyBank",
        label: "Promotions",
      },
      {
        icon: "setting",
        label: "Settings",
      },
      {
        icon: "signOut",
        label: "Sign out",
      },
    ];

    const profilePicture = require("../../assets/images/UserScreen/profile-picture.png");

    return (
      <AppLayout style={styles.container}>
        <View>
          {/* User profile picture and name */}
          <UserScreenHeader
            profilePicture={profilePicture}
            fullName={userName}
          />
          {menuItems.map(({ icon, label }, i) => {
            return <UserMenuItem icon={icon} label={label} key={i} />;
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
