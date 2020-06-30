import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import COLORS from "../../../styles/colors";

import { ListViewSearch } from "./ListViewSearch";
import { MapViewSearch } from "./MapViewSearch";
import { PrimarySearch, FilterRow } from "../../SearchScreen/components";

export const hotels = [
  {
    id: "1",
    latlng: { latitude: 37.77725, longitude: -122.4124 },
    price: "375",
  },
  {
    id: "2",
    latlng: { latitude: 37.78825, longitude: -122.4324 },
    price: "265",
  },
  {
    id: "3",
    latlng: { latitude: 37.79925, longitude: -122.4224 },
    price: "175",
  },
  {
    id: "4",
    latlng: { latitude: 37.77725, longitude: -122.4124 },
    price: "375",
  },
  {
    id: "5",
    latlng: { latitude: 37.78825, longitude: -122.4324 },
    price: "265",
  },
  {
    id: "6",
    latlng: { latitude: 37.79925, longitude: -122.4224 },
    price: "175",
  },
];

export const HomeSearchScreen = ({ navigation }) => {
  const [listType, setListType] = useState("map");
  const texts = {
    navRight: "Filter",
    navLeft: {
      map: "Map",
      list: "List",
    },
  };
  return (
    <View style={styles.container}>
      <PrimarySearch />
      <FilterRow
        onDirectToFilter={() =>
          navigation.navigate("Filter", { backScreen: "HomeSearchScreen" })
        }
        navigation={navigation}
        backScreen="HomeSearchScreen"
        listType={listType}
        onViewTypeChange={() =>
          setListType((v) => (v === "map" ? (v = "list") : (v = "map")))
        }
      />
      <View style={styles.listContainer}>
        {listType === "list" ? (
          <ListViewSearch hotels={hotels} />
        ) : (
          <MapViewSearch hotels={hotels} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    alignItems: "center",
    paddingTop: 25,
  },
  picker: {
    width: Dimensions.get("window").width,
    height: 55,
    fontFamily: "NunitoRegular",
    fontSize: 40,
  },
  pickerContainer: {
    elevation: 2,
    backgroundColor: COLORS.bgcLight,
  },
  headNav: {
    width: Dimensions.get("window").width,
    height: 50,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {},
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
