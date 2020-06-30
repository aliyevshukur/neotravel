import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import COLORS from "../../styles/colors";
import { CustomInput } from "../../components/CustomInput";
import { AppLayout } from "../../commons/AppLayout";
import { CardSlider } from "../../components";

export const SearchInitial = () => {
  const [isOnSearch, setIsOnSearch] = useState(false);
  return (
    <AppLayout style={styles.container}>
      <CustomInput
        style={{ marginTop: 30 }}
        long={true}
        placeHolder="Search for a city, area, or a hotel"
      />
      <CardSlider />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
