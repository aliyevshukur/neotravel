import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import { CustomButton } from "../../components";
import { ProgressBar } from "./components/ProgressBar";
import { ReservationContent } from "./components/ReservationContent";

export function ReservationScreen() {
  const [stageNumber, setStageNumber] = useState(1);
  const [buttonTitle, setButtonTitle] = useState("");
  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [userFormValues, setUserFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postCode: "",
    country: "",
    mobilePhone: "",
  });

  const [cardFormValues, setCardFromValues] = useState({
    cardNumber: "",
    CVV: null,
    name: "",
  });

  const handleUserFieldChange = (name, value) => {
    setUserFormValues({
      ...cardFormValues,
      [name]: value,
    });
  };

  const handleCardFieldChange = (name, value) => {
    if (name === "cardNumber") {
      value = String(value);
    }

    if ((name === "cardNumber" || name === "CVV") && isNaN(value)) {
      return;
    }

    setCardFromValues({
      ...cardFormValues,
      [name]: value,
    });
  };

  const handleButtonPress = () => {
    if (stageNumber === 3) console.log("not last one");
    else setStageNumber(stageNumber + 1);
  };

  useEffect(() => {
    switch (stageNumber) {
      case 1:
        setButtonTitle("Go to Payment");
        break;
      case 2:
        setButtonTitle("Go to Confirmation");
        break;
      case 3:
        setButtonTitle("Complete");
    }
  }, [stageNumber]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar activeNumber={stageNumber} style={styles.progressBar} />
      <KeyboardAvoidingView
        style={styles.formWrapper}
        behavior={Platform === "IOS" ? "padding" : "height"}
        enabled={isKeyboardAvoidEnabled}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ReservationContent
              stageNumber={stageNumber}
              userFormValues={userFormValues}
              cardFormValues={cardFormValues}
              handleUserFieldChange={handleUserFieldChange}
              handleCardFieldChange={handleCardFieldChange}
              setIsKeyboardAvoidEnabled={setIsKeyboardAvoidEnabled}
            />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <CustomButton
        title={buttonTitle}
        style={styles.button}
        onPress={handleButtonPress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingTop: 5,
    paddingBottom: 25,
    position: "relative",
  },
  formWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    width: "80%",
    fontSize: 24,
    marginTop: 20,
  },
  progressBar: {
    marginBottom: 5,
  },
});
