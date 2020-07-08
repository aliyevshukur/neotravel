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
import { connect } from "react-redux";

import bgcImage from "../../assets/images/homeScreen/homepage-background.png";
import COLORS from "../../styles/colors";

import { useSelector, useDispatch } from "react-redux";
import { setTabVisibility } from "../../store/navReducer";

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
  getHotelsOnDiscount,
  getRecommendedHotels,
} from "../../store/hotels";
import { HotelMedium } from "../../components/cards/HotelMedium";
import { findRecommendedHotels } from "../../utils/getRecommededHotels";
import { EmptyListComponent } from "./EmptyListComponent";

const mapStateToProps = (state) => ({
  hotelList: getHotelList(state),
  recommendedHotels: getRecommendedHotels(state),
  hotelsOnDiscount: getHotelsOnDiscount(state),
});

export const HomePage = connect(mapStateToProps, {
  getHotelListFB,
})((props) => {
  const { navigation, getHotelListFB, hotelList } = props;
  const texts = {
    description: "Find place that gives you ultimate calm",
    catalogueName: "Recommended",
  };
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [fieldValues, setFieldValues] = useState({
    place: "",
    date: "",
  });

  const dispatch = useDispatch();
  dispatch(setTabVisibility(true));

  useEffect(() => {
    fetchHotelsData();
    findRecommendedHotelsData();
  }, []);

  const fetchHotelsData = async () => {
    const response = await getHotelListFB();
  };

  const findRecommendedHotelsData = async () => {
    const data = await findRecommendedHotels(hotelList, 3);
    setRecommendedHotels(data);
  };

  const onFieldChange = (name, value) => {
    setFieldValues({
      ...fieldValues,
      [name]: value,
    });
  };

  const onFormSubmit = () => {
    for (key in fieldValues) {
      if (fieldValues[key].trim() === "") {
        Alert.alert(`Field ${fieldValues[key]} is empty`);
        return;
      }
    }

    const dateValues = fieldValues.date.split("/");
    const isDateValid = dateValues[0];

    if (!isDateValid) {
      return;
    }
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
          <View style={styles.searchArea}>
            <View style={styles.placeRow}>
              <CustomInput
                long={true}
                isSearch={false}
                isCross={false}
                placeholder="Place"
                dark={true}
                textStyle={{ color: COLORS.white }}
                onChangeText={(value) => onFieldChange("place", value)}
              />
            </View>
            <View style={styles.searchBottom}>
              {/* <CustomInput
                long={false}
                isSearch={false}
                isCross={false}
                placeholder="Date"
                dark={true}
                onChangeText={(value) => onFieldChange("date", value)}
              />
              <CustomPicker dark={true} title="Nights" /> */}

              <CustomPicker dark={true} title="Guests" />

              <View style={styles.datepickerWrapper}>
                <CustomRangeDatepicker
                  placeholder={"Pick date"}
                  min={new Date()}
                  style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: 50 }}
                />
              </View>
            </View>
            <CustomButton
              style={{
                marginTop: 20,
                fontSize: 24,
                width: "90%",
                marginTop: 30,
              }}
              title="Search a room"
              onPress={() => navigation.navigate("HomeSearchScreen")}
            />
          </View>
          <View style={styles.catalogue}>
            <CustomText style={styles.catalogueName}>
              {texts.catalogueName}
            </CustomText>
            {recommendedHotels.length != 0 ? (
              <FlatList
                data={recommendedHotels}
                horizontal={true}
                renderItem={({ item }) => {
                  return (
                    <HotelMedium
                      cardInfo={{
                        imgUrl: item.images[0],
                        price: item.price,
                        name: item.hotelName,
                        rating: item.hotelRating,
                        currency: item.currency,
                        place: item.hotelCity,
                      }}
                      style={styles.mediumHotelCard}
                      onPress={() => cardPressed(item?.id)}
                    />
                  );
                }}
                keyExtractor={(item) => item?.id}
                ListEmptyComponent={EmptyListComponent}
              />
            ) : null}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  catalogue: {
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
  searchBottom: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datepickerWrapper: {
    marginTop: 12,
  },
});
