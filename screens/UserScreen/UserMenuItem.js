import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomSvg, CustomText } from "../../components";
import { logOut } from "../../store/auth";
import { connect } from "react-redux";
import COLORS from "../../styles/colors";

import { useSelector } from "react-redux";

export const UserMenuItem = connect(null, { logOut })(
  ({ icon, label, logOut, navigation, onPressItem }) => {
    const theme = useSelector((state) => state.themeReducer).theme;

    const logOutHandler = () => {
      Alert.alert(
        "Alert!",
        "Are you sure you want to sign out?",
        [
          {
            text: "No",
            style: "cancel",
          },
          { text: "Yes", onPress: () => logOut() },
        ],
        { cancelable: true }
      );
    };
    return (
      <TouchableOpacity
        onPress={() => {
          label == "Sign out"
            ? logOutHandler()
            : navigation.navigate(onPressItem);
        }}
      >
        <View style={styles.container}>
          <View style={styles.icon}>
            <CustomSvg name={icon} gradient={true} style={styles.svg} />
          </View>
          <CustomText
            style={{
              ...styles.itemText,
              color: theme == "light" ? COLORS.blackText : COLORS.gray,
            }}
          >
            {label}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 35,
  },
  icon: {
    width: 24,
    height: 23,
    marginRight: 14,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
  itemText: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "NunitoSemiBold",
    color: COLORS.blackText,
  },
});
