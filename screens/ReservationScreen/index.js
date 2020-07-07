import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { CustomButton, CustomText, CustomSvg } from "../../components";
import { ProgressBar } from "./components/ProgressBar";
import { ReservationContent } from "./components/ReservationContent";
import COLORS from "../../styles/colors";


import {useSelector} from 'react-redux';

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

  const theme = useSelector(state => state.themeReducer).theme;


  const goBackHandler = () => {
    setStageNumber(stageNumber -1)
  }

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

  // contentContainerStyle={styles.container}
  return (
    <KeyboardAwareScrollView style={{width: "100%"}} >
    <View style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
          <CustomSvg name={"chevronLeft"} style={{...styles.chevronLeft, color: theme=="light" ? COLORS.blackText : COLORS.white}} />
        </TouchableOpacity>
        <CustomText style={{...styles.titleText, color: theme=="light" ? COLORS.blackText : COLORS.white}}>Reservation</CustomText>
      </View>
      <View style={styles.progressBarHolder}>
        <ProgressBar activeNumber={stageNumber} style={styles.progressBar} />
      </View>
        <View style={styles.main}>
              <ReservationContent
                stageNumber={stageNumber}
                userFormValues={userFormValues}
                cardFormValues={cardFormValues}
                handleUserFieldChange={handleUserFieldChange}
                handleCardFieldChange={handleCardFieldChange}
                setIsKeyboardAvoidEnabled={setIsKeyboardAvoidEnabled}
              />
          </View>
      <CustomButton
        title={buttonTitle}
        style={styles.button}
        onPress={handleButtonPress}
      />
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height:  Dimensions.get('window').height,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: Dimensions.get('window').height*0.07,
    paddingBottom: Dimensions.get('window').height*0.02,
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
    color: COLORS.blackText,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.blackText,
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: Dimensions.get('window').height*0.02,
    width: "90%",
    fontSize: 24,
  },
  progressBarHolder: {
    alignItems: "center",
    marginBottom: 5,

  },
  progressBar: {
  },
});
