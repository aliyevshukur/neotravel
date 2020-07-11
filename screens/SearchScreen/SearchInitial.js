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
import {
  getRecommendedHotels,
  getHotelsOnDealsFB,
  getHotelsOnDeals,
  getHotelListFB,
  getHotelList,
  getRoomListFB,
  getRoomList,
  searchHotelsFB,
  getSearchResult,
} from "../../store/hotels";
import { getMinRoomPrice } from "../../utils/getMinRoomPrice";

const mapStateToProps = (state) => ({
  recommendedHotels: getRecommendedHotels(state),
  hotelsOnDeals: getHotelsOnDeals(state),
  hotelList: getHotelList(state),
  roomList: getRoomList(state),
  searchResult: getSearchResult(state),
});

export const SearchInitial = connect(mapStateToProps, {
  getHotelsOnDealsFB,
  getHotelListFB,
  getRoomListFB,
  searchHotelsFB,
})(
  ({
    navigation,
    recommendedHotels,
    getHotelsOnDealsFB,
    hotelsOnDeals,
    getHotelListFB,
    hotelList,
    getRoomListFB,
    roomList,
    searchHotelsFB,
    searchResult,
  }) => {
    const theme = useSelector((state) => state.themeReducer).theme;
    const [searchValue, setSearchValue] = useState("");
    const [isOnSearch, setIsOnSearch] = useState(false);
    const [listType, setListType] = useState("list");
    const [dealsData, setDealsData] = useState([]);

    useEffect(() => {
      getHotelsOnDealsFB();
      getHotelListFB();
      getRoomListFB();

      if (hotelList.lenght !== 0) {
        const hotelsOnDealsData = [];
        hotelList.forEach((hotel) => {
          if (hotelsOnDeals.includes(hotel.id)) {
            hotelsOnDealsData.push({
              minPrice: getMinRoomPrice(roomList, hotel.id),
              ...hotel,
            });
          }
        });

        setDealsData(hotelsOnDealsData);
      }
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
    console.log("searchResult", searchResult);

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
          style={{ marginTop: 30, marginBottom: 33 }}
          long={true}
          placeHolder="Search for a city, area, or a hotel"
        />
        {!isOnSearch ? (
          <ScrollView>
            <CardSlider
              title="recommended"
              titleStyle={styles.recommendedTitleStyle}
              containerStyle={styles.recommendedContainerStyle}
              hotelsList={recommendedHotels}
            />
            <CardSlider
              title="deals"
              titleStyle={{
                ...styles.dealsTitleStyle,
                color: theme == "light" ? COLORS.blackText : COLORS.white,
              }}
              containerStyle={styles.dealsContainerStyle}
              hotelsList={dealsData}
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
                    <LargeHotelSlider hotels={searchResult} />
                  </ScrollView>
                ) : (
                  <ListViewSearch hotels={searchResult} />
                )
              ) : (
                <MapViewSearch
                  bottomListStyle={{ bottom: 110 }}
                  hotels={hotels}
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
