import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Formik } from "formik";

import { CustomInput } from "../../../components";
import { CreditCard } from "./CreditCard";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import COLORS from "../../../styles/colors";

export const ReservationContent = ({ stageNumber }) => {
  const formFields = [
    { name: "firstName", placeHolder: "First Name" },
    { name: "lastName", placeHolder: "Last Name" },
    { name: "email", placeHolder: "Email" },
    { name: "address", placeHolder: "Address" },
    { name: "postCode", placeHolder: "Post Code" },
    { name: "country", placeHolder: "Country" },
    { name: "mobilePhone", placeHolder: "Mobile Phone" },
  ];

  const [formValues, setFormValues] = useState({
    cardNumber: "",
    CVV: null,
    name: "",
  });

  const handleFieldChange = (name, value) => {
    if (name === "cardNumber") {
      value = String(value);
    }

    if ((name === "cardNumber" || name === "CVV") && isNaN(value)) {
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  switch (stageNumber) {
    case 1:
      return (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            alignItems: "center",
          }}
          style={styles.form}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              postCode: 0,
              country: "",
              mobilePhone: 0,
            }}
            onSubmit={(values) => {
              // console.log(values);
            }}
          >
            {(props) =>
              formFields.map((input) => (
                <CustomInput
                  isSearch={false}
                  isCross={false}
                  long={true}
                  placeholder={input.placeHolder}
                  value={props.values[input.name]}
                  onChangeText={props.handleChange(input.name)}
                />
              ))
            }
          </Formik>
        </ScrollView>
      );
    case 2:
      return (
        <>
          <CreditCard
            cardNumber={formValues.cardNumber}
            name={formValues.name}
            CVV={formValues.CVV}
          />

          <ScrollView contentContainerStyle={styles.cardForm}>
            <CustomInput
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={"CardNumber"}
              value={formValues.cardNumber}
              onChangeText={(value) => handleFieldChange("cardNumber", value)}
              keyboardType={"numeric"}
              maxLength={16}
            />

            <CustomInput
              isSearch={false}
              isCross={false}
              placeholder={"CVV"}
              value={formValues.CVV}
              onChangeText={(value) => handleFieldChange("CVV", value)}
              keyboardType={"numeric"}
              maxLength={3}
            />

            <CustomInput
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={"Name"}
              value={formValues.name}
              onChangeText={(value) => handleFieldChange("name", value)}
            />
          </ScrollView>
        </>
      );
    case 3:
      return (
        <View style={styles.checkout3}>
          <HotelLarge isMinimal={true} />
          <View style={styles.orderDescription}>
            <Text style={styles.orderText}>2 People</Text>
            <Text style={styles.orderText}>Standart King Room</Text>
            <Text style={styles.orderText}>2 nights</Text>
            <Text style={styles.orderText}>Jan 18 2019 to Jan 20 2019</Text>
          </View>
          <View style={styles.line} />
          <Text style={styles.cost}>$1350 USD</Text>
        </View>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
  },
  cardForm: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  checkout3: {
    width: "100%",
  },
  orderDescription: {
    marginTop: 5,
  },
  orderText: {
    fontSize: 16,
    color: COLORS.grayDark,
    lineHeight: 40,
  },
  line: {
    width: 337,
    height: 2,
    backgroundColor: COLORS.grayLight,
    marginVertical: 15,
  },
  cost: {
    fontWeight: "bold",
    fontSize: 36,
    color: COLORS.blackText,
  },
});
