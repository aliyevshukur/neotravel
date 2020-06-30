import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { CustomText } from "../../../components";

import filterPng from "../../../assets/images/homeScreen/Filter.png";

export const FilterRow = ({
  backScreen,
  onDirectToFilter,
  listType,
  onViewTypeChange,
  navigation,
}) => {
  const texts = {
    navRight: "Filter",
    navLeft: {
      map: "Map",
      list: "List",
    },
  };
  return (
    <View style={styles.headNav}>
      <View style={styles.headNavFilter}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Filter", { backScreen: backScreen })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image source={filterPng} style={styles.filterPng} />
          <CustomText style={styles.filterTxt}>{texts.navRight}</CustomText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onViewTypeChange}>
        <CustomText style={styles.listTypeName}>
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
  filterPng: {
    width: 16,
    height: 16,
    marginLeft: 18,
  },
});
