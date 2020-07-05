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

import React, { useState } from "react";
import { AppLoading } from "expo";
import { RootNav } from "./navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "react-native";

import { loadFonts } from "./styles/fonts";
import store, { persistor } from "./store";



export default function App() {
  const [loaded, setLoaded] = useState(false);
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          // hidden={true}
          backgroundColor={"rgba(0,0,0,0.4)"}
          translucent={true}
        />
        <RootNav />

      </PersistGate>
    </Provider>
  );
}
