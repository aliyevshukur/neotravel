import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import {
  NotificationScreen,
  SecondScreen,
  UserScreen,
  SignIn,
  ReservationScreen,
} from "../../screens";
import { TabBarIcon } from "./TabBarIcon";
import { HomePageStack } from "../HomeStack/HomeStack";
import { SearchStack } from "../SearchStack";

import COLORS from "../../styles/colors";
import { SearchInitial } from "../../screens/SearchScreen/SearchInitial";
import { Dimensions } from "react-native";
import { AccountStack } from "../AccountStack";

const { Navigator, Screen } = createBottomTabNavigator();

const TabItems = [
  {
    name: "HomePageStack",
    component: HomePageStack,
    icon: "home",
  },
  {
    name: "SearchStack",
    component: SearchStack,
    icon: "search",
  },
  {
    name: "NotificationScreen",
    component: NotificationScreen,
    icon: "bell",
  },

  {
    name: "AccountStack",
    component: AccountStack,
    icon: "user",
  },
];

export const BottomTabNav = () => {
  const tabStatus = useSelector((state) => state.navReducer);
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          marginTop: 5,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
          height: Dimensions.get("window").height / 10,
        },
      }}
      initialRouteName={TabItems[0].name}
    >
      {TabItems.map(({ name, component, icon }) => (
        <Screen
          key={name}
          name={name}
          component={component}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon icon={icon} isActive={focused ? true : false} />
              );
            },
          }}
        />
      ))}
    </Navigator>
  );
};
