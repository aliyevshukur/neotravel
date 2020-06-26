import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { CustomButton } from "../../components";
import { ProgressBar } from "./components/ProgressBar";
import { ReservationContent } from "./components/ReservationContent";

export function ReservationScreen() {
  const [stageNumber, setStageNumber] = useState(1);
  const [buttonTitle, setButtonTitle] = useState("");

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
    <View style={styles.container}>
      <ProgressBar activeNumber={stageNumber} />

      <ReservationContent stageNumber={stageNumber} />

      <CustomButton
        title={buttonTitle}
        style={styles.button}
        onPress={handleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 25
  },
  form: {
    marginTop: 15,
    marginBottom: 25,
  },
  button: {
    marginTop: 25,
  },
});
