import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { setTabVisibility } from "../../store/navReducer";

import bgcImage from "../../assets/images/homeScreen/homepage-background.png";
import COLORS from "../../styles/colors";
import { HotelMedium } from "../../components/cards/HotelMedium";
import { findRecommendedHotels } from "../../utils/getRecommededHotels";
import { EmptyListComponent } from "./EmptyListComponent";

import {
  CustomText,
  CustomButton,
  CustomInput,
  CustomPicker,
  CustomRangeDatepicker,
} from "../../components";
import {
  getHotelListFB,
  getHotelList,
  searchHotelsFB,
  getSearchResult,
  setRecommendedHotels,
  getRecommendedHotels,
  setLastSearchFieldValues,
} from "../../store/hotels";
import { updateFavoriteList } from "../../store/favorites";
import { selectUserId } from "../../store/auth";

const mapStateToProps = (state) => ({
  hotelList: getHotelList(state),
  searchResult: getSearchResult(state),
  recommendedHotels: getRecommendedHotels(state),
});

export const HomePage = connect(mapStateToProps, {
  getHotelListFB,
  getRoomListFB,
  updateFavoriteList,
  searchHotelsFB,
  setLastSearchFieldValues,
  setRecommendedHotels,
})((props) => {
  const {
    navigation,
    getHotelListFB,
    hotelList,
    searchHotelsFB,
    searchResult,
    updateFavoriteList,
    setLastSearchFieldValues,
    setRecommendedHotels,
    recommendedHotels,
  } = props;
  const texts = {
    description: "Find place that gives you ultimate calm",
    catalogueName: "Recommended",
  };
  // const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [fieldValues, setFieldValues] = useState({
    place: "",
    guests: "",
    dateRange: {},
  });

  const theme = useSelector((state) => state.themeReducer).theme;
  const dispatch = useDispatch();
  dispatch(setTabVisibility(true));
  const id = useSelector(selectUserId);
  useEffect(() => {
    // fetchHotelsData();
    // getHotelListFB();
    // findRecommendedHotelsData();
    // console.log(hotelList);
    fetchRoomsData();
    updateFavoriteList(id, false);
  }, []);

  const fetchHotelsData = async () => {};

  const findRecommendedHotelsData = async () => {
    const data = await findRecommendedHotels(hotelList, 3);
    console.log("data", data);

    setRecommendedHotels(data);
  };

  const onFieldChange = (name, value) => {
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
  };

  const onFormSubmit = async () => {
    for (const key in fieldValues) {
      if (key === "dateRange") {
        if (Object.keys(fieldValues[key]).length === 0) {
          Alert.alert(`Field ${key} is empty`);
          return;
        }
      } else if (fieldValues[key].trim() === "") {
        Alert.alert(`Field ${key} is empty`);
        return;
      }
    }

    const formattedPlace =
      fieldValues.place.charAt(0).toUpperCase() +
      fieldValues.place.slice(1, fieldValues.place.length).toLowerCase();

    const formattedGuests = +fieldValues.guests;

    setLastSearchFieldValues({
      place: formattedPlace,
      guests: formattedGuests,
      dateRange: fieldValues.dateRange,
    });
    const response = await searchHotelsFB(
      formattedPlace,
      formattedGuests,
      fieldValues.dateRange
    );

    navigation.navigate("HomeSearchScreen", {
      place: fieldValues.place,
      guests: fieldValues.guests,
      startDate: fieldValues.dateRange.startDate,
      endDate: fieldValues.dateRange.endDate,
    });
  };

  const cardPressed = (roomId) => {
    navigation.navigate("HotelScreen", { roomId });
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={bgcImage}
      style={{ width: 463, height: "100%" }}
    >
      <ScrollView>
        <View style={styles.homeSearchContainer}>
          <View style={styles.headerText}>
            <CustomText style={styles.appDescription}>
              {texts.description}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.searchArea,
              backgroundColor:
                theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
            }}
          >
            <View style={styles.placeRow}>
              <CustomInput
                // long={true}
                isSearch={false}
                isCross={false}
                placeholder="Place"
                onChangeText={(value) => onFieldChange("place", value)}
              />
              <CustomPicker
                dark={true}
                title="Guests"
                onValueChange={(value) => onFieldChange("guests", value)}
                pickerValue={fieldValues.guests}
              />
            </View>
            <View style={styles.datepickerWrapper}>
              <CustomRangeDatepicker
                placeholder={"Pick date"}
                min={new Date()}
                style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: 0 }}
                onSelect={(value) => onFieldChange("dateRange", value)}
                rangeValue={fieldValues.dateRange}
              />
            </View>
            <CustomButton
              style={{
                marginTop: 20,
                fontSize: 24,
                width: "90%",
                marginTop: 30,
              }}
              title="Search a room"
              onPress={onFormSubmit}
            />
          </View>
          <View style={styles.catalogue}>
            <CustomText style={styles.catalogueName}>
              {texts.catalogueName}
            </CustomText>
            <FlatList
              data={recommendedHotels}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <HotelMedium
                    cardInfo={{
                      imgUrl: item.images[0],
                      price: item.minPrice,
                      name: item.name,
                      rating: item.rating,
                      currency: item.currency,
                      place: item.city,
                    }}
                    style={styles.mediumHotelCard}
                    onPress={() => cardPressed(item?.id)}
                  />
                );
              }}
              keyExtractor={(item) => item?.id}
              ListEmptyComponent={EmptyListComponent}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgcImage: {
    width: 463,
    height: "100%",
  },
  homeSearchContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    width: 345,
    height: Dimensions.get("window").height / 7,
    marginBottom: 13,
  },
  searchArea: {
    width: Dimensions.get("window").width,
    height: "44%",
    backgroundColor: COLORS.homeScreenCatalogueBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  placeRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  catalogue: {
    width: "100%",
    backgroundColor: COLORS.homeScreenCatalogueBackground,
    height: "100%",
  },
  catalogueName: {
    fontFamily: "NunitoBold",
    fontSize: 22,
    color: COLORS.blackText,
    marginLeft: 21,
    marginBottom: 18,
    marginTop: 17,
  },
  appDescription: {
    fontSize: 36,
    fontFamily: "NunitoBold",
    color: COLORS.white,
  },
  mediumHotelCard: {
    marginLeft: 18,
  },
  datepickerWrapper: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
