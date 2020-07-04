import React from "react";
import { View, StyleSheet, Image } from "react-native";
import COLORS from "../../styles/colors";
import { CustomText, CustomSvg } from "../../components";

import icon from "../../assets/images/homeScreen/chevron-right.png";

export const NotfCard = ({ item, isLast }) => {
  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isLast ? COLORS.opaqueFirst : COLORS.bgcLight },
      ]}
    >
      <CustomText weight="semiBold" style={styles.description}>
        {item.description}
      </CustomText>
      <View style={styles.icon}>
        <CustomSvg name="chevronRight" gradient={isLast} style={styles.svg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: COLORS.bgcLight,
    paddingLeft: 28,
  },
  description: {
    fontSize: 18,
    width: "85%",
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 21,
    height: 17,
    // marginRight: 14,
  },
  svg: {
    width: "100%",
    height: "100%",
    color: COLORS.gray,
  },
});
