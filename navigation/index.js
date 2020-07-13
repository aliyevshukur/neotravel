import React from "react";
import { Image, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const { Navigator, Screen } = createStackNavigator();

import { BottomTabNav } from "./BottomTabNav/";
import {
  SignIn,
  ReservationScreen,
  SettingsPage,
  Favorites,
  HotelScreen,
  RoomScreen,
  FilterScreen,
} from "../screens";
import bgcLight from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { selectAuthStatus } from "../store/auth";

const myStateToProps = (state) => ({
  status: selectAuthStatus(state),
});

export const RootNav = connect(myStateToProps)(({ status }) => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        {status ? (
          <Screen
            options={{ headerShown: false }}
            name="BottomTabNav"
            component={BottomTabNav}
          />
        ) : (
          <>
            <Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
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
        <Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{ headerShown: false }}
        />
        <Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Screen name="HotelScreen" component={HotelScreen} />
        <Screen name="RoomScreen" component={RoomScreen} />
        <Screen name="Filter" component={FilterScreen} />
      </Navigator>
    </NavigationContainer>
  );
});
