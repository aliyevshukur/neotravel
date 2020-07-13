// ignore warning message
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import fb from "./firebaseConfig";
import { ApplicationProvider } from "@ui-kitten/components";
import { AppLoading } from "expo";
import { RootNav } from "./navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "react-native";

import { loadFonts } from "./styles/fonts";
import store, { persistor } from "./store";
import { default as mapping } from "./mapping.json";
import { ReservationScreen } from "./screens";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // const registerForPushNotifications = async () => {
  //   //checking for existing permission
  //   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus = status;

  //   // asking for permissions if is not granted
  //   if (status !== "granted") {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }

  //   // if permission denied
  //   if (finalStatus !== "granted") {
  //     return;
  //   }

  //   //get pushNotfsToken
  //   let token = await Notifications.getExpoPushTokenAsync();

  //   //add token to firebase

  //   let uid = fb.auth().currentUser.uid;
  //   fb.db().ref("users").child(uid).update({
  //     expoPushToken: token,
  //   });
  //   console.log(token, "---token");
  //   console.log(uid, "---uid");
  // };

  // useEffect(() => {
  //   registerForPushNotifications();
  // }, []);
  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setLoaded(true)}
        onError={() => "Loading Rejected"}
      />
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light} mapping={mapping}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            // hidden={true}
            backgroundColor={"rgba(0,0,0,0.5)"}
            translucent={true}
          />
          <RootNav />
        </PersistGate>
      </Provider>
    </ApplicationProvider>
  );
}
