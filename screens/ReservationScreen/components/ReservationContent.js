import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Alert,
  Button,
} from "react-native";
import { Header } from "@react-navigation/stack";
import { useSelector, connect } from "react-redux";
import CardFlip from "react-native-card-flip";

import COLORS from "../../../styles/colors";
import {
  CustomInput,
  CustomPicker,
  CustomRangeDatepicker,
  CustomText,
} from "../../../components";
import { CreditCard } from "./CreditCard";
import { HotelLarge } from "../../../components/cards/HotelLarge";
import { CustomSvg } from "../../../components/cards/CustomSvg";
import { selectFavorites } from "../../../store/favorites";
import { CreditCardBack } from "./CreditCardBack";
import { shadow } from "../../../styles/commonStyles";

const mapStateToProps = (state) => ({
  favorites: selectFavorites(state),
});

export const ReservationContent = connect(mapStateToProps)((props) => {
  const {
    stageNumber,
    reserveFormValues,
    userFormValues,
    cardFormValues,
    completePreviewValues,
    handleReserveFieldChange,
    handleUserFieldChange,
    handleCardFieldChange,
    setIsKeyboardAvoidEnabled,
    favorites,
  } = props;

  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useSelector((state) => state.themeReducer).theme;
  const orderColor = theme == "light" ? COLORS.grayDark : COLORS.gray,
    costColor = theme == "light" ? COLORS.blackText : COLORS.white,
    infoColor = theme == "light" ? COLORS.gray : COLORS.grayLight;

  const [isChecked, setIsChecked] = useState(false);
  const cardFlip = useRef(null);

  const formFields = [
    { name: "firstName", placeHolder: "First Name" },
    { name: "lastName", placeHolder: "Last Name" },
    { name: "email", placeHolder: "Email" },
    { name: "address", placeHolder: "Address" },
    { name: "postCode", placeHolder: "Post Code" },
    { name: "country", placeHolder: "Country" },
    { name: "mobilePhone", placeHolder: "Mobile Phone" },
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const startDateRaw = new Date(completePreviewValues?.startDate);
  const endDateRaw = new Date(completePreviewValues?.endDate);
  const startDate =
    `${startDateRaw.getDate()}` +
    " " +
    `${monthNames[startDateRaw.getMonth()]}` +
    " " +
    `${startDateRaw.getFullYear()}`;
  const endDate =
    `${endDateRaw.getDate()}` +
    " " +
    `${monthNames[endDateRaw.getMonth()]}` +
    " " +
    `${endDateRaw.getFullYear()}`;
  const nightCount = `${endDateRaw.getDate() - startDateRaw.getDate()}`;

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

  const handleInfoCircle = () => {
    Alert.alert(
      "Detailed Info",
      `${completePreviewValues.description}`,
      [{ text: "Ok", onPress: () => {} }],
      { cancelable: true }
    );
  };

  switch (stageNumber) {
    case 1:
      return (
        <View style={styles.reservForm}>
          <CustomPicker
            dark={true}
            title="Guests"
            onValueChange={(value) => handleReserveFieldChange("guests", value)}
            pickerValue={reserveFormValues.guests}
            pickerWidth={"100%"}
          />
          <View style={styles.datePickerHolder}>
            <CustomRangeDatepicker
              placeholder={"Pick date"}
              min={new Date()}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: 0 }}
              onSelect={(value) => handleReserveFieldChange("dateRange", value)}
              rangeValue={reserveFormValues.dateRange}
            />
          </View>
        </View>
      );
    case 2:
      return (
        <>
          {formFields.map((input, index) => (
            <CustomInput
              key={index}
              style={styles.inputCheckoutOne}
              isSearch={false}
              isCross={false}
              long={true}
              placeholder={input.placeHolder}
              value={userFormValues[input.name]}
              onChangeText={(value) => handleUserFieldChange(input.name, value)}
              onTouchStart={() => handleInputTouch("user", input.name)}
            />
          ))}
        </>
      );
    case 3:
      return (
        <View style={styles.cardContainer}>
          <CardFlip
            style={styles.cardFlipContainer}
            ref={(card) => (cardFlip.current = card)}
          >
            <CreditCard
              cardNumber={cardFormValues.cardNumber}
              name={cardFormValues.name}
              CVV={cardFormValues.expiry}
            />
            <CreditCardBack CVV={cardFormValues.CVV} />
          </CardFlip>
          <View style={styles.cardForm}>
            <CustomInput
              isSearch={false}
              style={styles.inputCheckout}
              isCross={false}
              placeholder={"CardNumber"}
              value={cardFormValues.cardNumber}
              onChangeText={(value) =>
                handleCardFieldChange("cardNumber", value)
              }
              keyboardType={"numeric"}
              maxLength={16}
            />
            <View style={styles.expiryHolder}>
              <CustomInput
                isSearch={false}
                isCross={false}
                style={styles.inputExpiry}
                placeholder={"Expiry"}
                value={cardFormValues.expiry}
                onChangeText={(value) => handleCardFieldChange("expiry", value)}
                maxLength={5}
                keyboardType={"numeric"}
                onTouchStart={() => handleInputTouch("card", "expiry")}
              />
              <CustomInput
                onFocus={() => cardFlip.current.flip()}
                onBlur={() => cardFlip.current.flip()}
                isSearch={false}
                isCross={false}
                style={styles.inputExpiry}
                placeholder={"CVV"}
                value={cardFormValues.CVV}
                onChangeText={(value) => handleCardFieldChange("CVV", value)}
                maxLength={3}
                keyboardType={"numeric"}
                onTouchStart={() => handleInputTouch("card", "CVV")}
              />
            </View>
            <CustomInput
              isSearch={false}
              isCross={false}
              style={styles.inputCheckout}
              placeholder={"Name"}
              value={cardFormValues.name}
              onChangeText={(value) => handleCardFieldChange("name", value)}
              onTouchStart={() => handleInputTouch("card", "name")}
            />
          </View>
          {/* <View style={styles.saveCard}>
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
          </View> */}
        </View>
      );
    case 4:
      return (
        <View style={styles.checkout3}>
          <HotelLarge
            isMinimal={true}
            style={{ width: "90%" }}
            cardInfo={{
              name: completePreviewValues.hotelName,
              rating: completePreviewValues.rating,
              imgUrl: completePreviewValues.imgUrl,
              isLiked: favorites.includes(completePreviewValues.id),
              hotelID: completePreviewValues.id,
            }}
          />
          <View style={styles.orderDescription}>
            <CustomText style={{ ...styles.orderText, color: orderColor }}>
              {completePreviewValues.guests}{" "}
              {completePreviewValues.guests > 1 ? "People" : "Person"}
            </CustomText>
            <CustomText style={{ ...styles.orderText, color: orderColor }}>
              {completePreviewValues?.roomName || "~"}
            </CustomText>
            <CustomText style={{ ...styles.orderText, color: orderColor }}>
              {nightCount} {nightCount > 1 ? "nights" : "night"}
            </CustomText>
            <CustomText style={{ ...styles.orderText, color: orderColor }}>
              {startDate || "time"} to {endDate || "time"}
            </CustomText>
          </View>
          <View style={styles.lineWrapper}>
            <View style={{ ...styles.line, color: infoColor }} />
          </View>
          <View style={styles.costHolder}>
            <CustomText style={{ ...styles.cost, color: costColor }}>
              {completePreviewValues?.currency || "$"}{" "}
              {completePreviewValues?.price || "~"}
            </CustomText>
            <TouchableOpacity style={styles.infoBtn} onPress={handleInfoCircle}>
              <CustomSvg
                name={"infoCircle"}
                style={{ width: "100%", height: "100%", color: infoColor }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    default:
      return <></>;
  }
});

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    width: "100%",
    // position: "relative",
  },
  cardFlipContainer: {
    left: "5%",
    width: "100%",
  },
  reservForm: {
    width: "90%",
    height: 150,
    justifyContent: "space-between",
  },
  datePickerHolder: {
    backgroundColor: "#0000",
    borderRadius: 40,
    padding: 2,
    ...shadow
  },
  cardForm: {
    marginTop: "55%",
    width: "100%",
    alignItems: "center",
  },
  expiryHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  inputCheckoutOne: {
    width: "90%",
    height: Dimensions.get("window").height * 0.07,
  },
  inputCheckout: {
    height: Dimensions.get("window").height * 0.07,
    width: "90%",
  },
  inputExpiry: {
    width: "43%",
    height: Dimensions.get("window").height * 0.07,
  },
  checkout3: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderDescription: {
    width: "90%",
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
    width: "90%",
    borderRadius: 2,
    height: 2,
    backgroundColor: COLORS.grayLight,
    marginVertical: Dimensions.get("window").height * 0.03,
  },
  costHolder: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cost: {
    fontSize: 32,
    color: COLORS.blackText,
    fontFamily: "NunitoBold",
  },
  infoBtn: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  saveCard: {
    width: "90%",
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
