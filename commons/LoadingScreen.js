import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import COLORS from "../styles/colors";

export const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>

      <View style={styles.loaderWrapper}>
        <ActivityIndicator
          size="large"
          color={COLORS.pink}
          style={styles.loader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
