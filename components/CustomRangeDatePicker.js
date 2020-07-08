import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {useSelector} from 'react-redux';

import {
  Layout,
  RangeDatepicker,
  Datepicker,
  styled,
} from "@ui-kitten/components";
import COLORS from "../styles/colors";

export const CustomRangeDatepicker = ({
  title,
  placeholder,
  min,
  style,
  onSelect,
  rangeValue,
}) => {

  const theme = useSelector(state => state.themeReducer).theme;


  return (
    <Layout style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}} level="1">
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
    backgroundColor: COLORS.bgcLight,
  },
});
