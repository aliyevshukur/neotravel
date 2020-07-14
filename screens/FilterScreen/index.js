import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
} from "react-native";

import { useSelector, useDispatch, connect } from "react-redux";
import { setTabVisibility } from "../../store/navReducer";

import { CustomSvg, CustomText } from "../../components";
import { CustomButton } from "../../components/CustomButton";
import COLORS from "../../styles/colors";
import { ToggleButton } from "../../components/ToggleButton";
import { SelectAlert } from "./SelectAlert";
import {
  getSearchResult,
  getPureSearchResult,
  setSearchHotelResults,
  setLastUserChoices,
  searchHotelsFB,
  getHotelsOnDealsFB,
  getHotelsOnDeals,
  getLastUserChoices,
  setFilteredResult,
} from "../../store/hotels";
import { filterByPriceFB } from "../../utils/firestoreRequests";

const mapStateToProps = (state) => ({
  searchResult: getSearchResult(state),
  pureSearchResult: getPureSearchResult(state),
  hotelsOnDeals: getHotelsOnDeals(state),
  lastUserChoices: getLastUserChoices(state),
});

export const FilterScreen = connect(mapStateToProps, {
  setSearchHotelResults,
  setLastUserChoices,
  searchHotelsFB,
  getHotelsOnDealsFB,
})(
  ({
    navigation,
    route,
    searchResult,
    pureSearchResult,
    setSearchHotelResults,
    setLastUserChoices,
    lastUserChoices,
    getHotelsOnDealsFB,
    hotelsOnDeals,
  }) => {
    const theme = useSelector((state) => state.themeReducer).theme;
    const dispatch = useDispatch();
    dispatch(setTabVisibility(false));
    const DATA = {
      budget: {
        fieldId: "budget", //must be same as object name
        name: "Your budget",
        selectables: ["$100", "$200", "$300", "$400", "$500", "$3000"],
      },
      rating: {
        fieldId: "rating",
        name: "Rating",
        selectables: ["1+", "2+", "3+", "3.5+", "4+", "4.5+", "5+"],
      },
      reviewScore: {
        fieldId: "reviewScore",
        name: "Review score",
        selectables: ["1+", "2+", "3+", "3.5+", "4+", "4.5+", "5+"],
      },
      meals: {
        fieldId: "meals",
        name: "Meals",
        selectables: ["Bozbash", "Dolma", "Dovgha"],
      },
      type: {
        fieldId: "type",
        name: "Type",
        selectables: [
          "Hotel",
          "Sporthotel",
          "Hotel Healthy & Spa",
          "Bed & Breakfast",
          "Obst- und Weinbauernhof",
          "Beachside Resort",
          "Resort",
          "Inn",
          "Serviced Apartments",
        ],
      },
      breakfast: {
        fieldId: "breakfast",
        name: "Breakfast included",
      },
      deals: {
        fieldId: "deals",
        name: "Deals",
      },
    };

    const [userChoices, setUserChoices] = useState(lastUserChoices); //values will be used as filter
    const [modal, setModal] = useState(false);
    const [selectProcess, setSelectProcess] = useState("");
    const [priceResult, setPriceResult] = useState(true);

    const fetchHotelsOnDeals = () => {
      if (hotelsOnDeals.data.length === 0) {
        getHotelsOnDealsFB();
      }
    };

    useEffect(() => {
      fetchHotelsOnDeals();
    }, []);

    const selectHandler = (id) => {
      setSelectProcess(id);
      setModal(true);
    };
    const togleHandler = (id, value) => {
      setUserChoices({
        ...userChoices,
        [id]: value,
      });
    };

    const backHandler = () => {
      navigation.navigate(route.params.backScreen);
      dispatch(setTabVisibility(true));
    };
    BackHandler.addEventListener("hardwareBackPress", function () {
      //hardware back Button actions could be handled here
      dispatch(setTabVisibility(true));
      navigation.navigate(route.params.backScreen);
      return true;
    });

    const resetHandler = () => {
      setLastUserChoices({ breakfast: false, deals: false });
      setUserChoices({ breakfast: false, deals: false });
    };

    const applyHandler = () => {
      // Save filter values
      setLastUserChoices(userChoices);

      // Set search result to inital search if all filters are empty
      if (Object.keys(userChoices).length === 0) {
        setSearchHotelResults(pureSearchResult);
      } else {
        // Take filter values from userChoices state
        const result = filterResult(pureSearchResult);
        setSearchHotelResults(result);
      }
      navigation.navigate("HomeSearchScreen");
    };

    const filterResult = (searchResult) => {
      console.log("INDIDE");
      const {
        budget,
        rating,
        reviewScore,
        type,
        breakfast = false,
        deals = false,
      } = userChoices;
      const result = [];
      searchResult.forEach((hotel) => {
        filterByPrice(hotel.id, budget.slice(1, budget.length));
        const priceCondition = budget ? priceResult : true;
        const ratingCondition = rating
          ? hotel.rating >= rating?.slice(0, rating.length - 1)
          : true;
        const reviewCondition = reviewScore
          ? String(hotel.reviewScore) >=
            reviewScore.slice(0, reviewScore.length - 1)
          : true;
        const typeCondition = type ? hotel.type === type : true;
        const breakfastCondition = breakfast ? hotel.breakfast === true : true;
        const isOnDeals = deals ? findIfonDeals(hotel.id) : true;

        console.log("priceCondition", priceCondition);
        console.log("ratingCondition", ratingCondition);
        console.log("reviewCondition", reviewCondition);
        console.log("typeCondition", typeCondition);
        console.log("breakfastCondition", breakfastCondition);
        console.log("isOnDeals", isOnDeals);

        if (
          priceCondition &&
          ratingCondition &&
          reviewCondition &&
          typeCondition &&
          breakfastCondition &&
          isOnDeals
        ) {
          result.push(hotel);
        }
      });

      return result;
    };

    const findIfonDeals = (id) => {
      let result = false;
      hotelsOnDeals.data.forEach((hotel) => {
        if (hotel.id === id) result = true;
      });

      return result;
    };

    const filterByPrice = async (hotelID, price) => {
      let result = false;
      result = await filterByPriceFB(hotelID, price);

      setPriceResult(result);
    };

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        {modal ? (
          <SelectAlert
            selectInfo={{
              title: DATA[selectProcess].name,
              selectables: DATA[selectProcess].selectables,
            }}
            selectResult={(selected) =>
              setUserChoices({ ...userChoices, [selectProcess]: selected })
            }
            closeModal={() => setModal(false)}
          />
        ) : null}
        <View style={styles.header}>
          <View style={styles.titleHolder}>
            <TouchableOpacity style={styles.backBtn} onPress={backHandler}>
              <CustomSvg
                name={"chevronLeft"}
                style={{
                  ...styles.chevronLeft,
                  color: theme == "light" ? COLORS.blackText : COLORS.white,
                }}
              />
            </TouchableOpacity>
            <CustomText
              style={{
                ...styles.titleText,
                color: theme == "light" ? COLORS.blackText : COLORS.white,
              }}
            >
              Filter
            </CustomText>
          </View>
          <TouchableOpacity
            style={{
              ...styles.resetBtn,
              backgroundColor:
                theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
            }}
            onPress={resetHandler}
          >
            <CustomText
              style={{
                ...styles.resetText,
                color: theme == "light" ? COLORS.grayDark : COLORS.gray,
              }}
            >
              Reset
            </CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.horizontalLine,
            backgroundColor:
              theme == "light" ? COLORS.offWhite : COLORS.grayDark,
          }}
        />
        <View style={styles.main}>
          <FlatList
            data={Object.values(DATA)}
            renderItem={({ item }) => (
              <View style={styles.filterItem}>
                <CustomText
                  style={{
                    ...styles.filterItemTitle,
                    color: theme == "light" ? COLORS.blackText : COLORS.gray,
                  }}
                >
                  {item.name}
                </CustomText>
                {item.selectables ? (
                  <TouchableOpacity
                    style={styles.selectTouch}
                    onPress={() => selectHandler(item.fieldId)}
                  >
                    <CustomText
                      style={{
                        ...styles.selectText,
                        color: theme == "light" ? COLORS.grayDark : COLORS.gray,
                      }}
                    >
                      {userChoices[item.fieldId] || "Select"}
                    </CustomText>
                    {userChoices[item.fieldId] ? null : (
                      <CustomSvg
                        name={"chevronRight"}
                        style={{
                          ...styles.chevronRight,
                          color:
                            theme == "light" ? COLORS.grayDark : COLORS.gray,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <View style={styles.selectTouch}>
                    <ToggleButton
                      value={userChoices[item.fieldId]}
                      setValue={(value) => togleHandler(item.fieldId, value)}
                    />
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item) => item.fieldId}
          />
        </View>
        <View style={styles.applyHolder}>
          <CustomButton
            title={"Apply"}
            onPress={applyHandler}
            style={styles.applyBtn}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.bgcLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 25,
  },
  titleHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    marginLeft: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.blackText,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.blackText,
  },
  resetBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 84,
    height: 38,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: COLORS.bgcLight,
    elevation: 5,
  },
  resetText: {
    fontFamily: "NunitoSemiBold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.grayDark,
    textTransform: "uppercase",
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.white,
  },
  main: {
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.68,
    paddingBottom: 24,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterItemTitle: {
    fontStyle: "normal",
    fontFamily: "NunitoSemiBold",
    fontSize: 20,
    lineHeight: 27,
    color: COLORS.blackText,
    marginLeft: 21,
    paddingTop: 16,
    paddingBottom: 16,
  },
  selectTouch: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 21,
  },
  selectText: {
    fontSize: 20,
    lineHeight: 27,
    fontStyle: "normal",
    color: COLORS.grayDark,
    marginRight: 14,
  },
  chevronRight: {
    width: 10,
    height: 18,
    color: COLORS.grayDark,
    opacity: 0.7,
  },
  applyHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  applyBtn: {
    width: "90%",
    fontSize: 24,
    fontFamily: "NunitoBold",
  },
});
