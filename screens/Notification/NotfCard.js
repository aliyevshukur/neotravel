import React from "react";
import { View, StyleSheet } from "react-native";
import COLORS from "../../styles/colors";
import { IconWbg, CustomText, CustomSvg } from "../../components";
export const NotfCard = ({ item, isLast }) => {
  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isLast ? COLORS.opaqueFirst : COLORS.bgcLight },
      ]}
    >
      <CustomText> {item.description} </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 30,
    backgroundColor: COLORS.bgcLight,
    paddingLeft: 28,
  },
});
