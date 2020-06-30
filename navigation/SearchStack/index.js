import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchInitial } from "../../screens/SearchScreen/SearchInitial";
import { FilterScreen } from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export const SearchStack = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="initial" component={SearchInitial} />
      <Screen name="filter" component={FilterScreen} />
    </Navigator>
  );
};
