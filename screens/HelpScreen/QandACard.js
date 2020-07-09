import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomText, CustomSvg } from "../../components";
import COLORS from "../../styles/colors";

export const QandACard = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CustomSvg gradient={true} style={styles.svg} name="question" />
      </View>
      <View style={styles.dialog}>
        <CustomText weight="bold" style={styles.question}>
          {item.question}
        </CustomText>
        <CustomText style={styles.answer}>{item.answer}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",

    padding: 10,
  },
  question: {
    fontSize: 22,
    color: COLORS.darkPriceInCards,
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
});
