import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import { IconWbg } from "../../components";

export const TabBarIcon = ({ isActive, icon, onPress }) => {
  return (
    <IconWbg
      style={{ ...styles.container, elevation: isActive ? 5 : 0 }}
      iconName={icon}
      gradient={isActive}
      iconWidth={25}
      iconHeight={25}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").height / 14,
    height: Dimensions.get("window").height / 14,
  },
});
