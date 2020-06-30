import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomePage,
  HomeSearchScreen,
  RoomScreen,
  HotelScreen,
  FilterScreen
} from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export const HomePageStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="HomePage" component={HomePage} />
      <Screen name="HomeSearchScreen" component={HomeSearchScreen} />
      <Screen name="Filter" component={FilterScreen} />
      <Screen name="HotelScreen" component={HotelScreen} />
      <Screen name="RoomScreen" component={RoomScreen} />
    </Navigator>
  );
};
