import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { Header } from "@react-navigation/stack";

import COLORS from "../../../styles/colors";
import { CustomInput, CustomText } from "../../../components";
import { CreditCard } from "./CreditCard";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import { CustomSvg } from "../../../components/cards/CustomSvg";

export const ReservationContent = (props) => {
  const {
    stageNumber,
    userFormValues,
    cardFormValues,
    handleUserFieldChange,
    handleCardFieldChange,
    setIsKeyboardAvoidEnabled,
  } = props;

  const [isChecked, setIsChecked] = useState(false);

  const formFields = [
    { name: "firstName", placeHolder: "First Name" },
    { name: "lastName", placeHolder: "Last Name" },
    { name: "email", placeHolder: "Email" },
    { name: "address", placeHolder: "Address" },
    { name: "postCode", placeHolder: "Post Code" },
    { name: "country", placeHolder: "Country" },
    { name: "mobilePhone", placeHolder: "Mobile Phone" },
  ];

  // Enable KeyboardAvoidingView if user clicked spesific field
  const handleInputTouch = (form, name) => {
    let isEnabled = false;

    if (form === "user") {
      if (["country", "mobilePhone", "postCode"].indexOf(name) >= 0)
        isEnabled = true;
    } else if (form === "card") {
      if (["name", "CVV"].indexOf(name) >= 0) isEnabled = true;
    }

    setIsKeyboardAvoidEnabled(isEnabled);
  };

  switch (stageNumber) {
    case 1:
      return (
        <>
          {formFields.map((input, index) => (
            <CustomInput
              key={index}
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={input.placeHolder}
              value={userFormValues[input.name]}
              onChangeText={() => handleUserFieldChange(input.name)}
              onTouchStart={() => handleInputTouch("user", input.name)}
            />
          ))}
        </>
      );
    case 2:
      return (
        <View style={styles.cardContainer}>
          <CreditCard
            cardNumber={cardFormValues.cardNumber}
            name={cardFormValues.name}
            CVV={cardFormValues.CVV}
          />
          <View style={styles.cardForm}>
            <CustomInput
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={"CardNumber"}
              value={cardFormValues.cardNumber}
              onChangeText={(value) =>
                handleCardFieldChange("cardNumber", value)
              }
              keyboardType={"numeric"}
              maxLength={16}
            />

            <CustomInput
              isSearch={false}
              isCross={false}
              placeholder={"CVV"}
              value={cardFormValues.CVV}
              onChangeText={(value) => handleCardFieldChange("CVV", value)}
              maxLength={3}
              keyboardType={"numeric"}
              onTouchStart={() => handleInputTouch("card", "CVV")}
            />

            <CustomInput
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={"Name"}
              value={cardFormValues.name}
              onChangeText={(value) => handleCardFieldChange("name", value)}
              onTouchStart={() => handleInputTouch("card", "name")}
            />
          </View>
          <View style={styles.saveCard}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => setIsChecked(!isChecked)}
            >
              {isChecked && (
                <CustomSvg
                  name={"check"}
                  gradient={true}
                  style={{ width: 12, height: 16 }}
                />
              )}
            </TouchableOpacity>
            <CustomText style={styles.saveCardText}>
              Save this credit card
            </CustomText>
          </View>
        </View>
      );
    case 3:
      return (
        <View style={styles.checkout3}>
          <HotelLarge
            isMinimal={true}
            cardInfo={{
              imgUrl:
                "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            }}
          />
          <View style={styles.orderDescription}>
            <Text style={styles.orderText}>2 People</Text>
            <Text style={styles.orderText}>Standart King Room</Text>
            <Text style={styles.orderText}>2 nights</Text>
            <Text style={styles.orderText}>Jan 18 2019 to Jan 20 2019</Text>
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
          </View>
          <CustomText style={styles.cost}>$1350 USD</CustomText>
        </View>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
  },
  userForm: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardForm: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  checkout3: {
    width: "100%",
    justifyContent: "space-between",
    padding: 25,
  },
  orderDescription: {
    marginTop: 5,
  },
  orderText: {
    fontSize: 16,
    color: COLORS.grayDark,
    lineHeight: 33,
  },
  lineWrapper: {
    width: "100%",
    alignItems: "center",
  },
  line: {
    width: 350,
    height: 2,
    backgroundColor: COLORS.grayLight,
    marginVertical: 15,
  },
  cost: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.blackText,
  },
  saveCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkBox: {
    backgroundColor: "#0000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 24,
    height: 24,
    elevation: 2,
    marginRight: 10,
  },
  saveCardText: {
    color: COLORS.gray,
  },
});
