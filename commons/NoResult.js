import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CustomText } from "../components";
import COLORS from "../styles/colors";

export const NoResult = () => {
  const theme = useSelector((state) => state.themeReducer).theme;
  return (
    <View style={styles.notFound}>
      <CustomText
        style={{
          fontSize: 30,
          color: theme === "light" ? COLORS.grayDark : COLORS.grayLight,
        }}
      >
        No results found. ¯\_(ツ)_/¯
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  notFound: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 70,
  },
});
