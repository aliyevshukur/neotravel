import React from "react";
import { Image, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNav } from "./BottomTabNav/";
import { SignIn, ReservationScreen } from "../screens";
import bgcLight from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
const { Navigator, Screen } = createStackNavigator();

export const RootNav = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Login" component={LoginScreen} />
        {/* <Screen name="Register" component={RegisterScreen} /> */}
        <Screen name="BottomTabNav" component={BottomTabNav} />
        <Screen
          name="ReservationScreen"
          component={ReservationScreen}
          options={({ navigation }) => ({
            title: "Reservation",
            headerStyle: {
              backgroundColor: bgcLight,
              elevation: 0,
            },
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
        />
      </Navigator>
    </NavigationContainer>
  );
};
