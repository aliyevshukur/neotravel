import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect, useSelector } from "react-redux";

import { CustomText, LargeHotelSlider, CustomSvg } from "../components";
import COLORS from "../styles/colors";
import { getRoomList, getHotelList } from "../store/hotels";
import { addHotel, deleteHotel, selectFavorites } from "../store/favorites";

const mapStateToProps = (state) => ({
  hotels: getHotelList(state),
  favorites: selectFavorites(state),
});

export const Favorites = connect(mapStateToProps, { addHotel, deleteHotel })(
  ({ navigation, addHotel, deleteHotel, hotels, favorites }) => {
    const theme = useSelector((state) => state.themeReducer).theme;

    const filteredHotels = hotels.filter((item) => {
      return favorites.includes(item.id);
    });

    const goBackHandler = () => {
      navigation.goBack();
    };

    return (
      <View style={styles.container}>
        <View style={styles.favoriteCards}>
          <LargeHotelSlider
            hotels={filteredHotels}
            bgColor={"transparent"}
            style={{
              height: "100%",
              paddingBottom: "13%",
              marginTop: 0,
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingBottom: "5%",
  },
  header: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    // elevation: 2,
    // justifyContent: "center",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "black",
    paddingTop: "10%",
    paddingBottom: "2%",
  },

  headerTxt: {
    fontSize: 28,
    color: COLORS.gradientPink,
    marginTop: "5%",
    marginLeft: "25%",
    // marginTop: "10%",
    // top: "10%",
    // marginBottom: "5%",
  },
  favoriteCards: {
    // flex: 1,
    // height: "120%",
    // backgroundColor: "black",
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.blackText,
    marginTop: 15,
  },
  backBtn: {
    marginLeft: 19,
    // marginRight: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
    marginTop: "1%",
  },
});
