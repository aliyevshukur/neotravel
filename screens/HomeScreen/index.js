import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";

import bgcImage from "../../assets/images/homeScreen/homepage-background.png";
import COLORS from "../../styles/colors";
import { CustomText } from "../../components/CustomText";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { CustomPicker } from "../../components/CustomPicker";
import { HotelMedium } from "../../components/cards/HotelMedium";
import { getHotelListFB, getHotelList } from "../../store/hotels";

const hotels = [{ id: "1" }, { id: "2" }, { id: "3" }];

const mapStateToProps = (state) => ({
  hotelList: getHotelList(state),
});

export const HomePage = connect(mapStateToProps, { getHotelListFB })(
  ({ navigation, getHotelListFB, hotelList }) => {
    useEffect(() => {
      getHotelListFB();
      console.log("Hotel List: ", hotelList);
    }, []);

    const texts = {
      description: "Find place that gives you ultimate calm",
      catalogueName: "Recommended",
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
                  long={false}
                  isSearch={false}
                  isCross={false}
                  placeholder="Place"
                  dark={true}
                  textStyle={{ color: COLORS.white }}
                />
                <CustomPicker dark={true} title="Guests" />
              </View>
              <View style={styles.dateRow}>
                <CustomInput
                  long={false}
                  isSearch={false}
                  isCross={false}
                  placeholder="Date"
                  dark={true}
                />
                <CustomPicker dark={true} title="Nights" />
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
              <FlatList
                data={hotelList}
                horizontal={true}
                renderItem={({ item }) => (
                  <HotelMedium
                    cardInfo={{
                      imgUrl: item.images[0],
                      price: item.price,
                      name: item.name,
                    }}
                    style={styles.mediumHotelCard}
                    key={item.id}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    height: Dimensions.get("window").height / 2.12,
    backgroundColor: COLORS.bgcDark,
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
});
