import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import COLORS from "../../styles/colors";
import { CustomSvg } from "./CustomSvg";

import {useSelector} from 'react-redux';
export const IconWbg = ({
  style,
  iconName = "location",
  iconColor,
  iconWidth,
  iconHeight,
  // theme = "light",
  gradient = true,
  onPress,
}) => {

  const theme = useSelector(state => state.themeReducer).theme;

  return (
    <View style={styles.touchable} onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
          },
        ]}
      >
        <View
          style={{
            ...styles.svgHolder,
            width: iconWidth || 15,
            height: iconHeight || 21,
          }}
        >
          <CustomSvg
            style={{ ...styles.icon, color: iconColor || COLORS.tabNavIcon }}
            name={iconName}
            gradient={gradient}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {},
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    borderRadius: 5,
    elevation: 5,
  },
  svgHolder: {
    justifyContent: "center",
    alignItems: "center",
    // width: 15,
    // height: 21,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
