import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { CustomText } from "../../components";
import COLORS from "../../styles/colors";
import { useSelector } from "react-redux";

export const PaymentItem = ({ paymentInfo, theme }) => {
  const readableDate = new Date(paymentInfo?.date).getDate()
  + "/" + new Date(paymentInfo?.date).getMonth()
  + "/" + new Date (paymentInfo?.date).getFullYear(); 
  return (
    <View style={styles.paymentItem}>
      <Image style={styles.roomImg} source={{ uri: paymentInfo?.imgUrl }} />
      <View style={styles.pamentInfo}>
        <View style={styles.paymentDesc}>
          <CustomText
            style={{
              ...styles.paymentText,
              color: theme !== "light" ? COLORS.bgcLight : COLORS.bgcDark,
            }}
          >
            {paymentInfo?.hotelName || "~"}
          </CustomText>
          <View style={styles.roomHolder}>
            <CustomText style={styles.roomName}>
              {paymentInfo?.roomName || "~"}
            </CustomText>
            <CustomText style={styles.date}>
              {paymentInfo?.date ? readableDate : "date unknown"}
            </CustomText>
          </View>
        </View>
        <View style={styles.priceHolder}>
          <CustomText style={styles.price}>
            {paymentInfo?.currency || "$"} {paymentInfo?.price || "~"}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
  roomImg: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginHorizontal: 10,
    backgroundColor: COLORS.imgLoad,
  },
  pamentInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    //   borderTopColor: COLORS.gray,
    //   borderTopWidth: 1,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  paymentDesc: {
    flex: 1,
    justifyContent: "space-between",
  },
  paymentText: {
    fontSize: 20,
    fontFamily: "NunitoSemiBold",
    color: COLORS.bgcDark,
  },
  roomHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  roomName: {
    fontSize: 14,
    color: COLORS.grayDark,
  },
  date: {
    fontSize: 8,
    color: COLORS.gray,
  },
  priceHolder: {
    marginLeft: 10,
    justifyContent: "center",
  },
  price: {
    fontFamily: "NunitoBold",
    fontSize: 15,
    color: COLORS.gradientOrange,
  },
});
