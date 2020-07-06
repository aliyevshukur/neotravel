import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, RangeDatepicker,Datepicker, styled } from "@ui-kitten/components";

export const CustomRangeDatepicker = ({ title, placeholder, min, style }) => {
  const [range, setRange] = useState({});

  return (
    <Layout style={styles.container} level="1">
      <RangeDatepicker
        range={range}
        onSelect={(nextRange) => setRange(nextRange)}
        title={() => title}
        placeholder={placeholder}
        min={min}
        backdropStyle={style}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 360,
  },
});
