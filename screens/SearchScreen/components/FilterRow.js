import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {useSelector} from 'react-redux';

import { CustomText, CustomSvg } from "../../../components";

import filterPng from "../../../assets/images/homeScreen/Filter.png";
import COLORS from "../../../styles/colors";

export const FilterRow = ({
  backScreen,
  onDirectToFilter,
  listType,
  onViewTypeChange,
  navigation,
}) => {

  const theme = useSelector(state => state.themeReducer).theme;


  const texts = {
    navRight: "Filter",
    navLeft: {
      map: "Map",
      list: "List",
    },
  };
  return (
    <View style={{
      ...styles.headNav,
      borderBottomColor: theme=="light" ? COLORS.white : COLORS.grayDark,
      borderTopColor: theme=="light" ? COLORS.white : COLORS.grayDark
    }}>
      <View style={styles.headNavFilter}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Filter", { backScreen: backScreen })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <CustomSvg name={'filter'} style={{...styles.filterSvg, color: theme=="light" ? COLORS.gray : COLORS.offWhite}}/>
          <CustomText style={{...styles.filterTxt, color: theme=="light" ? COLORS.grayDark : COLORS.gray}}>{texts.navRight}</CustomText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onViewTypeChange}>
        <CustomText style={{...styles.listTypeName, color: theme=="light" ? COLORS.grayDark : COLORS.gray}}>
          {listType === "map" ? texts.navLeft.list : texts.navLeft.map}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headNav: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "white",
    borderTopColor: "white",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  listContainer: {
    marginTop: 21,
  },
  filterTxt: {
    fontFamily: "NunitoRegular",
    fontSize: 16,
    marginLeft: 8,
  },
  listTypeName: {
    fontFamily: "NunitoRegular",
    fontSize: 16,
    marginRight: 20,
  },
  filterSvg: {
    width: 16,
    height: 16,
    marginLeft: 18,
  },
});
