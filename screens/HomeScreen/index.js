import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";

import bgcImage from "../../assets/images/homeScreen/homepage-background.png";
import COLORS from "../../styles/colors";
import { CustomText } from "../../components/CustomText";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { CustomPicker } from "../../components/CustomPicker";
import { HotelMedium } from "../../components/cards/HotelMedium";

const hotels = [{ id: "1" }, { id: "2" }, { id: "3" }];

export const HomePage = ({ navigation }) => {
  const [placeValue, setPlaceValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const texts = {
    description: "Find place that gives you ultimate calm",
    catalogueName: "Recommended",
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      source={bgcImage}
      style={styles.bgcImage}
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
                value={placeValue}
                onChangeText={setPlaceValue}
                long={false}
                isSearch={false}
                isCross={true}
                placeholder="Place"
                dark={true}
                textStyle={{ color: COLORS.white }}
              />
              <CustomPicker dark={true} title="Guests" />
            </View>
            <View style={styles.dateRow}>
              <CustomInput
                value={dateValue}
                onChangeText={setDateValue}
                long={false}
                isSearch={false}
                isCross={true}
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
              data={hotels}
              horizontal={true}
              renderItem={({ item }) => (
                <HotelMedium
                  cardInfo={{
                    imgUrl:
                      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                    price: "2500",
                    name: "River Side",
                  }}
                  style={styles.mediumHotelCard}
                  key={item.id}
                  onPress={() => navigation.navigate({ name: "HotelScreen" })}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

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
