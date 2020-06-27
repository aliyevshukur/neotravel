import React from "react";
import { Image, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNav } from "./BottomTabNav/";
import { SignIn, ReservationScreen } from "../screens";
import bgcLight from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const { Navigator, Screen } = createStackNavigator();

export const RootNav = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({navigation}) => ({
          headerStyle: { backgroundColor: bgcLight, elevation: 0 },
          headerTitleStyle: {
            marginLeft: -20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
              <Image
                style={{ marginLeft: 18, width: 14, height: 22 }}
                source={require("../assets/images/ReservationScreen/back-arrow.png")}
              />
            </TouchableOpacity>
          ),
        })}
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="BottomTabNav" component={BottomTabNav} />
        <Screen
          name="ReservationScreen"
          component={ReservationScreen}
          options={{ title: "Reservation" }}
        />
      </Navigator>
    </NavigationContainer>
  );
};