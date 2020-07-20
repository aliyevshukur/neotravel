import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import COLORS from "../styles/colors";
import { AppLayout } from "./AppLayout";

export const LoadingScreen = () => {
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <AppLayout
      style={{
        ...styles.loadingScreen,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View style={styles.loaderWrapper}>
        <ActivityIndicator
          size="large"
          color={COLORS.pink}
          style={styles.loader}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
