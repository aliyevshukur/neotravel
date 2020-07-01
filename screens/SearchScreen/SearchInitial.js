import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import COLORS from "../../styles/colors";
import { CustomInput, LargeHotelSlider } from "../../components";
import { AppLayout } from "../../commons/AppLayout";
import { CardSlider } from "../../components";

import { ScrollView } from "react-native-gesture-handler";
import { FilterRow } from "./components";
import { MapViewSearch } from "../HomeScreen/SearchScreen/MapViewSearch";
import { ListViewSearch } from "../HomeScreen/SearchScreen/ListViewSearch";
import { hotels } from "../HomeScreen/SearchScreen";

export const SearchInitial = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");

  const [isOnSearch, setIsOnSearch] = useState(false);
  const [listType, setListType] = useState("list");

  const submitSearchHandler = () => {
    if (searchValue.trim() !== "") {
      setIsOnSearch(true);
    } else {
      setIsOnSearch(false);
    }
  };

  return (
    <AppLayout style={styles.container}>
      <CustomInput
        returnKeyType="go"
        onSubmitEditing={() => submitSearchHandler()}
        onChangeText={setSearchValue}
        value={searchValue}
        style={{ marginTop: 30, marginBottom: 33 }}
        long={true}
        placeHolder="Search for a city, area, or a hotel"
      />
      <ScrollView>
        {!isOnSearch ? (
          <>
            <CardSlider
              title="recommended"
              titleStyle={styles.recommendedTitleStyle}
              containerStyle={styles.recommendedContainerStyle}
            />
            <CardSlider
              title="deals"
              titleStyle={styles.dealsTitleStyle}
              containerStyle={styles.dealsContainerStyle}
            />
          </>
        ) : (
          <>
            <FilterRow
              backScreen="initial"
              navigation={navigation}
              onDirectToFilter={() =>
                navigation.navigate("Filter", { backScreen: "initial" })
              }
              listType={listType}
              onViewTypeChange={() =>
                setListType((v) => (v === "map" ? (v = "list") : (v = "map")))
              }
            />
            <View style={styles.listContainer}>
              {listType === "list" ? (
                isOnSearch ? (
                  <LargeHotelSlider hotels={hotels} />
                ) : (
                  <ListViewSearch hotels={hotels} />
                )
              ) : (
                <MapViewSearch hotels={hotels} />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    alignItems: "center",
    paddingTop: 25,
  },
  recommendedContainerStyle: {
    backgroundColor: COLORS.bgcDark,
  },
  recommendedTitleStyle: {
    color: COLORS.bgcLight,
    marginTop: 30,
  },
  listContainer: {
    height: "100%",
    flex: 1,
    // alignItems: "flex-end",
  },

  dealsTitleStyle: {
    color: COLORS.bgcDark,
    marginTop: 21,
  },
});
