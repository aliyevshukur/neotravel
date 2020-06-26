import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Picker,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";

import COLORS from "../../../styles/colors";
import { CustomText } from "../../../components/CustomText";
import filterPng from "../../../assets/images/homeScreen/Filter.png";
import { ListViewSearch } from "./ListViewSearch";
import { MapViewSearch } from "./MapViewSearch";

const hotels = [
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

export const HomeSearchScreen = () => {
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
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker} mode="dropdown">
          <Picker.Item
            label={"SF, USA - 2 guests - Jan 18 to Jan 23"}
            value={"1"}
          />
          <Picker.Item
            label={"SF, USA - 3 guests - Jan 20 to Jan 25"}
            value={"2"}
          />
        </Picker>
      </View>
      <View style={styles.headNav}>
        <View style={styles.headNavFilter}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image source={filterPng} style={styles.filterPng} />
            <CustomText style={styles.filterTxt}>{texts.navRight}</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            setListType((v) => (v === "map" ? (v = "list") : (v = "map")))
          }
        >
          <CustomText style={styles.listTypeName}>
            {listType === "map" ? texts.navLeft.map : texts.navLeft.list}
          </CustomText>
        </TouchableOpacity>
      </View>
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
