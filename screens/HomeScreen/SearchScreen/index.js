import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector, connect } from "react-redux";

import COLORS from "../../../styles/colors";

import { ListViewSearch } from "./ListViewSearch";
import { MapViewSearch } from "./MapViewSearch";
import { PrimarySearch, FilterRow } from "../../SearchScreen/components";
import { CustomText } from "../../../components";
import { getSearchResult, setSearchHotelResults } from "../../../store/hotels";
import { NoResult } from "../../../commons/NoResult";

export const hotels = [
  {
    id: "1",
    latlng: { latitude: 37.77725, longitude: -122.4124 },
    price: "375560",
  },
  {
    id: "2",
    latlng: { latitude: 37.78825, longitude: -122.4324 },
    price: "265126",
  },
  {
    id: "3",
    latlng: { latitude: 37.79925, longitude: -122.4224 },
    price: "175098",
  },
  {
    id: "4",
    latlng: { latitude: 37.80725, longitude: -122.4124 },
    price: "375457",
  },
  {
    id: "5",
    latlng: { latitude: 37.81825, longitude: -122.4324 },
    price: "265231",
  },
  {
    id: "6",
    latlng: { latitude: 37.82925, longitude: -122.4224 },
    price: "13565344.89",
  },
];

const mapStateToProps = (state) => ({
  searchResult: getSearchResult(state),
});

export const HomeSearchScreen = connect(mapStateToProps, {
  setSearchHotelResults,
})(({ route, navigation, searchResult, setSearchHotelResults }) => {
  const theme = useSelector((state) => state.themeReducer).theme;
  const [listType, setListType] = useState("map");
  const { place, guests, startDate, endDate } = route?.params;

  const texts = {
    navRight: "Filter",
    navLeft: {
      map: "Map",
      list: "List",
    },
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // useEffect(() => {
  //   return resetSearchResult();
  // }, []);

  // const resetSearchResult = () => {
  //   setSearchHotelResults([]);
  // };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      {/* <PrimarySearch /> */}
      <View style={styles.searchLabel}>
        <CustomText>
          {`${place} ${guests} guests ${
            monthNames[startDate.getMonth()]
          } ${startDate.getDate()} - ${
            monthNames[endDate.getMonth()]
          } ${endDate.getDate()}`}
        </CustomText>
      </View>
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

      {searchResult.length !== 0 ? (
        <View style={styles.listContainer}>
          {listType === "list" ? (
            <ListViewSearch navigation={navigation} hotels={searchResult} />
          ) : (
            <MapViewSearch navigation={navigation} hotels={searchResult} />
          )}
        </View>
      ) : (
        <NoResult />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    alignItems: "center",
    paddingTop: 35,
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
  searchLabel: {
    paddingBottom: 10,
  },
});
