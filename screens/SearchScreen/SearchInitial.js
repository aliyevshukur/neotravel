import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector, connect } from "react-redux";

import COLORS from "../../styles/colors";
import { CustomInput, LargeHotelSlider } from "../../components";
import { AppLayout } from "../../commons/AppLayout";
import { CardSlider } from "../../components";

import { ScrollView } from "react-native-gesture-handler";
import { FilterRow } from "./components";
import { MapViewSearch } from "../HomeScreen/SearchScreen/MapViewSearch";
import { ListViewSearch } from "../HomeScreen/SearchScreen/ListViewSearch";
import { hotels } from "../HomeScreen/SearchScreen";
import { LoadingScreen } from "../../commons/LoadingScreen";
import {
  getRecommendedHotels,
  getHotelsOnDealsFB,
  getHotelsOnDeals,
  searchHotelsFB,
  getSearchResult,
  getSearchLoading,
} from "../../store/hotels";

const mapStateToProps = (state) => ({
  recommendedHotels: getRecommendedHotels(state),
  hotelsOnDeals: getHotelsOnDeals(state),
  searchResult: getSearchResult(state),
  loading: getSearchLoading(state),
});

export const SearchInitial = connect(mapStateToProps, {
  getHotelsOnDealsFB,
  searchHotelsFB,
})(
  ({
    navigation,
    recommendedHotels,
    getHotelsOnDealsFB,
    hotelsOnDeals,
    searchHotelsFB,
    searchResult,
    loading,
  }) => {
    const theme = useSelector((state) => state.themeReducer).theme;
    const [searchValue, setSearchValue] = useState("");
    const [isOnSearch, setIsOnSearch] = useState(false);
    const [listType, setListType] = useState("list");

    useEffect(() => {
      getHotelsOnDealsFB();
    }, []);

    const submitSearchHandler = () => {
      if (searchValue.trim() !== "") {
        const formattedPlace =
          searchValue.charAt(0).toUpperCase() +
          searchValue.slice(1, searchValue.length).toLowerCase();
        searchHotelsFB(formattedPlace);
        setIsOnSearch(true);
      } else {
        setIsOnSearch(false);
      }
    };
    if (hotelsOnDeals.loading) {
      return <LoadingScreen />;
    }

    return (
      <AppLayout
        style={{
          ...styles.container,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        <CustomInput
          returnKeyType="go"
          onSubmitEditing={() => submitSearchHandler()}
          onChangeText={setSearchValue}
          value={searchValue}
          style={{ marginTop: 30, marginBottom: 33, height: 45 }}
          long={true}
          placeHolder="Search for a city, area, or a hotel"
        />
        {!isOnSearch ? (
          <ScrollView>
            <CardSlider
              title="recommended"
              titleStyle={styles.recommendedTitleStyle}
              containerStyle={styles.recommendedContainerStyle}
              hotelsList={recommendedHotels.data}
              onPressItem={(hotelInfo) =>
                navigation.navigate("HotelScreen", { hotelInfo: hotelInfo })
              }
            />
            <CardSlider
              title="deals"
              titleStyle={{
                ...styles.dealsTitleStyle,
                color: theme == "light" ? COLORS.blackText : COLORS.white,
              }}
              containerStyle={styles.dealsContainerStyle}
              hotelsList={hotelsOnDeals.data}
              onPressItem={(hotelInfo) =>
                navigation.navigate("HotelScreen", { hotelInfo })
              }
            />
          </ScrollView>
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
                  <ScrollView>
                    <LargeHotelSlider
                      hotels={searchResult}
                      onItemPress={(hotelInfo) =>
                        navigation.navigate("HotelScreen", { hotelInfo })
                      }
                    />
                  </ScrollView>
                ) : (
                  <ListViewSearch hotels={searchResult} />
                )
              ) : (
                <MapViewSearch
                  bottomListStyle={{ bottom: 110 }}
                  hotels={searchResult}
                  navigation={navigation}
                />
              )}
            </View>
          </>
        )}
      </AppLayout>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    alignItems: "center",
    paddingTop: 25,
  },
  recommendedContainerStyle: {
    backgroundColor: COLORS.blackText,
  },
  recommendedTitleStyle: {
    color: COLORS.bgcLight,
    marginTop: 30,
  },
  listContainer: {
    // alignItems: "flex-end",
  },

  dealsTitleStyle: {
    color: COLORS.bgcDark,
    marginTop: 21,
  },
});
