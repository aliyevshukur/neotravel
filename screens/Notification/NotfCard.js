import React from "react";
import { View, StyleSheet, Image } from "react-native";
import COLORS from "../../styles/colors";
import { CustomText, CustomSvg } from "../../components";

import { useSelector } from "react-redux";

import icon from "../../assets/images/homeScreen/chevron-right.png";
import { color } from "react-native-reanimated";

export const NotfCard = ({ item = [], isLast }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  let lastItemColor = COLORS.opaqueFirst,
    itemColor = COLORS.bgcLight,
    textColor = COLORS.blackText;

  if (theme == "light") {
    lastItemColor = COLORS.opaqueFirst;
    itemColor = COLORS.bgcLight;
    textColor = COLORS.blackText;
  } else {
    lastItemColor = COLORS.darkNotification;
    itemColor = COLORS.bgcDark;
    textColor = COLORS.gray;
  }

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isLast ? lastItemColor : itemColor },
      ]}
    >
      <View style={styles.textWrapper}>
      <CustomText
        weight="semiBold"
        style={{ ...styles.description, color: textColor }}
      >
        {item.hotelName + "("+ item.roomName + ")"}
      </CustomText>
      <CustomText
        weight="semiBold"
        style={{ ...styles.dateText, color: textColor }}
      >
        {new Date(item.startDate).toDateString() + "-" + new Date(item.endDate).toDateString()}
      </CustomText>
      </View>
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
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2
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
  textWrapper: {
    alignItems: 'flex-start'
  },
  dateText: {
    fontSize: 14,
    width: "85%",
  }
});
