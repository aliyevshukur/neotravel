import React from "react";
import {
  TouchableNativeFeedback,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import {
  Favorites,
  HelpScreen,
  UserScreen,
  SettingsPage,
  PaymentsScreen,
} from "../../screens";
import { CustomSvg } from "../../components";
import COLORS from "../../styles/colors";
import { shadow } from "../../styles/commonStyles";

const { Navigator, Screen } = createStackNavigator();

const navScreens = [
  {
    name: "favorites",
    component: Favorites,
  },
  {
    name: "payments",
    component: PaymentsScreen,
  },
  {
    name: "help",
    component: HelpScreen,
  },
  {
    name: "settings",
    component: SettingsPage,
  },

  {
    name: "user",
    component: UserScreen,
  },
];
const screenWidth = Dimensions.get("window").width;

export const AccountStack = ({ route, navigation }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <Navigator
      initialRouteName="user"
      screenOptions={{
        headerTitleAlign: "left",
        headerTitleStyle: {
          ...styles.titleText,
          color: theme == "light" ? COLORS.bgcDark : COLORS.bgcLight,
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        },
        headerLeft: () => (
          <TouchableNativeFeedback onPress={() => navigation.navigate("user")}>
            <View style={styles.backBtn}>
              <CustomSvg
                name={"chevronLeft"}
                style={{
                  ...styles.chevronLeft,
                  color: theme == "light" ? COLORS.bgcDark : COLORS.bgcLight,
                }}
              />
            </View>
          </TouchableNativeFeedback>
        ),
      }}
    >
      {navScreens.map((screen, index) => (
        <Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={({ route }) => ({
            headerShown: Boolean(route.name !== "user"),
            title: route.name == "payments" ? "reservations" : route.name,
          })}
        />
      ))}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  header: {},
  titleHolder: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 15,
  },
  backBtn: {
    marginLeft: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    textTransform: "capitalize",
  },
});
