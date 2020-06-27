import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNav } from "./BottomTabNav";
import { SignIn } from "../screens/SignIn";
const { Navigator, Screen } = createStackNavigator();

export const RootNav = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="SignIn" component={SignIn} />
        <Screen name="BottomTabNav" component={BottomTabNav} />
      </Navigator>
    </NavigationContainer>
  );
};
