import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomText, CustomSvg } from "../../components";
import COLORS from "../../styles/colors";

export const QandACard = ({ item, theme }) => {
  console.log("theme from helpscreen -- ", theme);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View style={styles.icon}>
        <CustomSvg gradient={true} style={styles.svg} name="question" />
      </View>
      <View style={styles.dialog}>
        <CustomText
          weight="bold"
          style={{
            ...styles.question,
            color: theme == "light" ? COLORS.darkPriceInCards : COLORS.offWhite,
          }}
        >
          {item.question}
        </CustomText>
        <CustomText style={styles.answer}>{item.answer}</CustomText>
        <View
          style={{
            ...styles.horizontalLine,
            backgroundColor: theme == "light" ? COLORS.white : COLORS.grayDark,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    padding: 10,
  },
  question: {
    fontSize: 22,
  },
  dialog: {
    width: "80%",
  },
  answer: {
    fontSize: 15,
    color: COLORS.gray,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 14,
    marginTop: 10,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
  horizontalLine: {
    marginTop: 10,
    height: 1,
    width: "100%",
  },
});
