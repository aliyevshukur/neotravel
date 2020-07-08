import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Layout,
  RangeDatepicker,
  Datepicker,
  styled,
} from "@ui-kitten/components";

export const CustomRangeDatepicker = ({
  title,
  placeholder,
  min,
  style,
  onSelect,
  rangeValue,
}) => {

  return (
    <Layout style={styles.container} level="1">
      <RangeDatepicker
        range={rangeValue}
        onSelect={(nextRange) => onSelect(nextRange)}
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
