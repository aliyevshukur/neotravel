import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage, HomeSearchScreen, FilterScreen } from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export const HomePageStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="HomePage" component={HomePage} />
      <Screen name="HomeSearchScreen" component={HomeSearchScreen} />
      <Screen name="Filter" component={FilterScreen} />
    </Navigator>
  );
};
