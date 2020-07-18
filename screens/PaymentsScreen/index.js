import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import fb from '../../firebaseConfig';
import { connect, useSelector } from "react-redux";

import { CustomText, CustomSvg } from "../../components";
import COLORS from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { PaymentItem } from "./PaymentItem";

const screenWidth = Dimensions.get("window").width;

import {
  selectPayments,
  setInitial,
  getPaymentsFromFirebase,
} from '../../store/payments';

const mapStateToProps = (state) => ({
  payments: selectPayments(state),
});
export const PaymentsScreen = connect(mapStateToProps, {
  getPaymentsFromFirebase,
  setInitial,
})(({
  payments,
  getPaymentsFromFirebase,
  setInitial,
}) => {
  
  const theme = useSelector((state) => state.themeReducer).theme;

  const currentUserId = fb.auth.currentUser.uid;
  

  useEffect(() => {
    setInitial();
    getPaymentsFromFirebase(currentUserId);
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View
        style={{
          ...styles.main,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        <FlatList
          contentContainerStyle={styles.paymentList}
          data={payments}
          renderItem={({ item, index }) => (
            <PaymentItem theme={theme} key={index} paymentInfo={item} />
          )}
          keyExtractor={(item) => item.id}
          // ListFooterComponent={<View style={{ margin: 20 }} />}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.bgcLight,
  },
  header: {
    width: "100%",
    paddingTop: 50,
  },
  gradientHeader: {
    position: "absolute",
    top: -880,
    left: -(1000 - screenWidth) / 2,
    width: 1000,
    height: 1000,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    elevation: 5,
    zIndex: -1,
  },
  titleHolder: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 15,
  },
  backBtn: {
    marginLeft: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.offWhite,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.offWhite,
  },
  main: {
    width: "100%",
    // paddingBottom: 90,
  },
  paymentList: {
    paddingTop: 40,
  },
});
