import React from "react";
import { View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FirstScreen,
  SecondScreen,
  UserScreen,
  SignIn,
  ReservationScreen,
} from "../../screens";
import { TabBarIcon } from "./TabBarIcon";
import { HomePageStack } from "../HomeStack/HomeStack";
import { SearchStack } from "../SearchStack";

import bell from "../../assets/images/bell.png";
import bellActive from "../../assets/images/bell-active.png";
import home from "../../assets/images/home.png";
import homeActive from "../../assets/images/home-active.png";
import search from "../../assets/images/search.png";
import searchActive from "../../assets/images/search-active.png";
import user from "../../assets/images/user.png";
import userActive from "../../assets/images/user-active.png";
import COLORS from "../../styles/colors";

const { Navigator, Screen } = createBottomTabNavigator();

const TabItems = [
  {
    name: "HomePageStack",
    component: HomePageStack,
    image: home,
    activeImage: homeActive,
  },
  {
    name: "SearchStack",
    component: SearchStack,
    image: search,
    activeImage: searchActive,
  },
  {
    name: "SecondScreen",
    component: SecondScreen,
    image: bell,
    activeImage: bellActive,
  },
  {
    name: "UserScreen",
    component: UserScreen,
    image: user,
    activeImage: userActive,
  },
];

export const BottomTabNav = () => {
  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: COLORS.bgcLight,
          height: 78,
        },
      }}
    >
      {TabItems.map(({ image, activeImage, name, component }) => (
        <Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon
                  image={focused ? activeImage : image}
                  isActive={focused ? true : false}
                />
              );
            },
          }}
        />
      ))}
    </Navigator>
  );
};
