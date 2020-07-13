import React from "react";
import {
  TouchableNativeFeedback,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Favorites,
  SecondScreen,
  HelpScreen,
  UserScreen,
  SettingsPage,
  PaymentsScreen,
} from "../../screens";
import { CustomSvg } from "../../components";
import COLORS from "../../styles/colors";
import { useSelector } from "react-redux";

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
    name: "promotions",
    component: SecondScreen,
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
          color: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        },
        headerStyle: styles.header,
        headerLeft: () => (
          <TouchableNativeFeedback onPress={() => navigation.navigate("user")}>
            <View style={styles.backBtn}>
              <CustomSvg
                name={"chevronLeft"}
                style={{
                  ...styles.chevronLeft,
                  color: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
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
  header: {
    width: "100%",
    paddingTop: 50,
  },
  gradientHeader: {
    // position: "absolute",
    // top: -880,
    // left: -(1000 - screenWidth) / 2,
    // width: 1000,
    // borderBottomLeftRadius: 1000,
    // borderBottomRightRadius: 1000,
    // elevation: 5,
    // zIndex: -1,
    // width: screenWidth,
    // height: 100,
    // borderRadius: 50,
    // backgroundColor: COLORS.pink,
    // transform: [{ scaleX: 2 }],
  },
  header: {
    backgroundColor: COLORS.gradientPink,
    elevation: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
  },
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
