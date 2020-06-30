import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Favorites,
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
    name: "Favorites",
    component: Favorites,
    icon: "bell",
  },
  {
    name: "UserScreen",
    component: UserScreen,
    icon: "user",
  },
];

export const BottomTabNav = () => {
  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          marginTop: 5,
          // marginLeft: 5,
          // marginRight: 5,
          backgroundColor: COLORS.bgcLight,
          height: 78,
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
