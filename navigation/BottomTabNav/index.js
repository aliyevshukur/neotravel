import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FirstScreen, SecondScreen, ThirdScreen, SignIn } from "../../screens";
import { TabBarIcon } from "./TabBarIcon";

import bell from "../../assets/images/bell.png";
import bellActive from "../../assets/images/bell-active.png";
import home from "../../assets/images/home.png";
import homeActive from "../../assets/images/home-active.png";
import search from "../../assets/images/search.png";
import searchActive from "../../assets/images/search-active.png";
import user from "../../assets/images/user.png";
import userActive from "../../assets/images/user-active.png";

const { Navigator, Screen } = createBottomTabNavigator();

const TabItems = [
  {
    name: "SignIn",
    component: SignIn,
    image: home,
    activeImage: homeActive,
  },
  {
    name: "FirstScreen",
    component: FirstScreen,
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
    name: "ThirdScreen",
    component: ThirdScreen,
    image: user,
    activeImage: userActive,
  },
];

export const BottomTabNav = () => {
  return (
    <Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "#E3E6EC", height: 80 },
      }}
    >
      {TabItems.map(({ image, activeImage, name, component }) => (
        <Screen
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
