import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useNavigationState } from "@react-navigation/native";

import { connect, useSelector, useDispatch } from "react-redux";
import { setTabVisibility } from "../../store/navReducer";

import fb from "../../firebaseConfig";
import bgcImage from "../../assets/images/homeScreen/homepage-background.png";
import COLORS from "../../styles/colors";
import { HotelMedium } from "../../components/cards/HotelMedium";
import { EmptyListComponent } from "./EmptyListComponent";
import { LoadingScreen } from "../../commons/LoadingScreen";
import {
  CustomText,
  CustomButton,
  CustomInput,
  CustomPicker,
  CustomRangeDatepicker,
} from "../../components";
import {
  getHotelListFB,
  searchHotelsFB,
  getSearchResult,
  getRecommendedHotelsFB,
  getRecommendedHotels,
  setLastSearchFieldValues,
} from "../../store/hotels";
import { updateFavoriteList, selectFavorites } from "../../store/favorites";
import { selectUserId, getUserInfo, selectPushToken, setUserId } from "../../store/auth";
import {
  getUserDataFB,
  getUserData,
  getLoading,
  getErrorMsg,
  fetchUserRequest,
} from "../../store/user";
import { shadow } from "../../styles/commonStyles";
import { checkIfRoomReserved } from "../../store/reservation";
import { selectPayments, getPaymentsFromFirebase } from "../../store/payments";
import { sendPushNotification } from "../../utils/pushNotification";

const mapStateToProps = (state) => ({
  searchResult: getSearchResult(state),
  recommendedHotels: getRecommendedHotels(state),
  favorites: selectFavorites(state),
  userData: getUserData(state),
  loading: getLoading(state),
  errorMsg: getErrorMsg(state),
  pushToken: selectPushToken(state),
  reservations: selectPayments(state),
  userId :selectUserId(state),
});

export const HomePage = connect(mapStateToProps, {
  getHotelListFB,
  updateFavoriteList,
  searchHotelsFB,
  setLastSearchFieldValues,
  getRecommendedHotelsFB,
  getUserDataFB,
  fetchUserRequest,
  checkIfRoomReserved,
  getPaymentsFromFirebase,
  setUserId,
})((props) => {
  const {
    navigation,
    getHotelListFB,
    searchHotelsFB,
    updateFavoriteList,
    setLastSearchFieldValues,
    recommendedHotels,
    favorites,
    getUserDataFB,
    userData,
    errorMsg,
    loading,
    getRecommendedHotelsFB,
    fetchUserRequest,
    checkIfRoomReserved,
    pushToken,
    reservations,
    getPaymentsFromFirebase,
    userId,
    setUserId
  } = props;
  const texts = {
    description: "Find place that gives you ultimate calm",
    catalogueName: "Recommended",
  };

  const state = useNavigationState((state) => state);
  const routeName = state.routeNames[state.index];

  const [fieldValues, setFieldValues] = useState({
    place: "",
    guests: "",
    dateRange: {},
  });

  // Search button turns to loader if it is true
  const [isSeachLoading, setIsSearchLoading] = useState(false);

  const theme = useSelector((state) => state.themeReducer).theme;
  const dispatch = useDispatch();
  dispatch(setTabVisibility(true));
  const id = useSelector(selectUserId);
  //Check if there is any reservation that startDate remain 1 day
  const checkReservations = () => {
    if (reservations.length) {
      for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].startDate - Date.now() < 86400000) {
          sendPushNotification(pushToken, reservations[i].hotelName);
        }
      }
    }
  };
  useEffect(() => {
    getPaymentsFromFirebase(userId);
    setTimeout(() => {
      checkReservations();
    }, 5000)
  }, []);

  useEffect(() => {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        getUserDataFB(user.uid);
        setUserId(user.uid);
      } else {
        fetchUserRequest();
      }
    });
    getHotelListFB();
    getUserInfo();
    updateFavoriteList(id, false);
  }, []);

  useEffect(() => {
    if (!loading) {
      getRecommendedHotelsFB(userData.recommendeds);
    }
  }, [userData]);

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

    // Turn on loader on search button
    setIsSearchLoading(true);

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
      startDate: fieldValues.dateRange.startDate.getTime(),
      endDate: fieldValues.dateRange.endDate.getTime(),
    });

    // Turn off loader on search button
    setIsSearchLoading(false);
  };

  const cardPressed = (item) => {
    navigation.navigate("HotelScreen", { hotelInfo: item });
  };

  if (loading && recommendedHotels.loading) {
    return <LoadingScreen />;
  }

  if (errorMsg && recommendedHotels.errorMsg) {
    Alert.alert("Something went wrong", errorMsg);
    return <></>;
  }

  BackHandler.addEventListener("hardwareBackPress", function () {
    //hardware back Button actions could be handled here
    if (routeName == "HomePage") {
      BackHandler.exitApp();
      return true;
    }
    navigation.goBack();
    return true;
  });

  return (
    <ImageBackground
      resizeMode="cover"
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
                placeholder="City"
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
                onSelect={(value) => onFieldChange("dateRange", value)}
                rangeValue={fieldValues.dateRange}
              />
            </View>
            {!isSeachLoading ? (
              <CustomButton
                style={{
                  fontSize: 24,
                  width: "90%",
                  marginTop: 30,
                }}
                title="Search a room"
                onPress={onFormSubmit}
              />
            ) : (
              <View style={styles.loaderWrapper}>
                <ActivityIndicator size="large" color={COLORS.pink} />
              </View>
            )}
          </View>
          <View style={styles.catalogue}>
            <CustomText style={styles.catalogueName}>
              {texts.catalogueName}
            </CustomText>
            <FlatList
              data={recommendedHotels.data}
              horizontal={true}
              renderItem={({ item }) => {
                const isLiked = favorites.includes(item.id);
                return (
                  <HotelMedium
                    cardInfo={{
                      imgUrl: item.images[0],
                      price: item.minPrice,
                      name: item.name,
                      rating: item.rating,
                      currency: item.currency,
                      place: item.city,
                      isLiked: isLiked,
                    }}
                    style={styles.mediumHotelCard}
                    onPress={() => cardPressed(item)}
                  />
                );
              }}
              keyExtractor={(item) => item?.id}
              ListEmptyComponent={EmptyListComponent}
              ListFooterComponent={<View style={{ margin: 10 }} />}
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
    backgroundColor: "#0000",
    borderRadius: 40,
    ...shadow,
  },
  loaderWrapper: {
    height: 70,
    marginTop: 30,
    width: "90%",
  },
});
