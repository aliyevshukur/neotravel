import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  BackHandler,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Gallery from "react-native-image-gallery";
import { LinearGradient } from "expo-linear-gradient";

import {
  CustomText,
  CustomSvg,
  Rating,
  IconWbg,
  CustomButton,
} from "../../components";
import COLORS from "../../styles/colors";

import { useSelector, useDispatch, connect } from "react-redux";
import { setTabVisibility } from "../../store/navReducer";
import {
  updateFavoriteList,
  selectFavorites,
  addHotel,
  deleteHotel,
} from "../../store/favorites";
import fb from "../../firebaseConfig";

const screenH = Dimensions.get("window").height;
const screenW = Dimensions.get("window").width;

const mapStateToProps = (state) => ({
  favorites: selectFavorites(state),
});

export const HotelScreen = connect(mapStateToProps, {
  addHotel,
  deleteHotel,
  updateFavoriteList,
})(
  ({
    navigation,
    route,
    favorites,
    addHotel,
    deleteHotel,
    updateFavoriteList,
  }) => {
    const dispatch = useDispatch();
    // dispatch(setTabVisibility(false));
    const theme = useSelector((state) => state.themeReducer).theme;

    const { hotelInfo } = route?.params;
    const [isLiked, setIsLiked] = useState(hotelInfo.isLiked);

    const [isGallery, setGallery] = useState(false);

    useEffect(() => {
      setIsLiked(favorites.includes(hotelInfo.id));
    }, [favorites]);

    const galleryImages = hotelInfo?.images?.map((item) => {
      return {
        source: { uri: item },
        // dimensions: { width: "100%"},
      };
    });

    const selectRoomsHandler = () => {
      navigation.navigate("RoomScreen", {
        hotelId: hotelInfo.id,
        hotelName: hotelInfo.name,
      });
    };
    const goBackHandler = () => {
      // dispatch(setTabVisibility(true));
      navigation.goBack();
    };
    const likeHandler = () => {
      isLiked ? deleteHotel(hotelInfo.id) : addHotel(hotelInfo.id);
      const id = fb?.auth?.currentUser?.uid;
      setIsLiked((value) => !value);
      updateFavoriteList(id, true);
    };

    const galleryHandler = () => {
      setGallery(true);
    };
    const closeGallery = () => {
      setGallery(false);
    };

    BackHandler.addEventListener("hardwareBackPress", function () {
      if (isGallery) {
        setGallery(false);
        return true;
      }

      //hardware back Button actions could be handled here
      dispatch(setTabVisibility(true));
      navigation.goBack();
      return true;
    });

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        {isGallery ? (
          <Gallery
            style={styles.gallery}
            images={galleryImages}
            //   onSingleTapConfirmed={closeGallery}
          />
        ) : null}
        <TouchableOpacity onPress={galleryHandler}>
          <View>
            <LinearGradient
              start={[0, 0]}
              end={[0, 0.5]}
              colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
              style={styles.gradient}
            >
              <Image
                resizeMode={"cover"}
                style={styles.bgImg}
                source={{ uri: hotelInfo?.images[0] }}
              />
              <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
                <CustomSvg name={"chevronLeft"} style={styles.chevronLeft} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.likeBtn} onPress={likeHandler}>
                <CustomSvg
                  name={isLiked ? "heartFull" : "heartEmpty"}
                  style={{
                    ...styles.heartSvg,
                    color: isLiked ? "red" : "white",
                  }}
                />
              </TouchableOpacity>
            </LinearGradient>
            <View style={styles.maskGroupHolder}>
              {hotelInfo?.images.length > 1 ? (
                <Image
                  resizeMode={"cover"}
                  style={styles.maskImg}
                  source={{ uri: hotelInfo?.images[1] }}
                />
              ) : null}
              {hotelInfo?.images.length > 2 ? (
                <Image
                  resizeMode={"cover"}
                  style={styles.maskImg}
                  source={{ uri: hotelInfo?.images[2] }}
                />
              ) : null}
              {hotelInfo?.images.length > 3 ? (
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)"]}
                  style={styles.maskImg}
                >
                  <Image
                    resizeMode={"cover"}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: hotelInfo?.images[3] }}
                  />
                  {hotelInfo?.images.length > 4 ? (
                    <View style={styles.countHolder}>
                      <CustomText style={styles.imgCount}>
                        {hotelInfo?.images.length - 4}+
                      </CustomText>
                    </View>
                  ) : null}
                </LinearGradient>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.titleHolder}>
          <CustomText
            style={{
              ...styles.titleText,
              color: theme == "light" ? COLORS.blackText : COLORS.white,
            }}
          >
            {hotelInfo.name}
          </CustomText>
          <Rating style={styles.rating} value={hotelInfo.rating} />
        </View>
        <View style={styles.mapHolder}>
          <View style={styles.mapPreloader}>
            <CustomText style={styles.mapLoading}>Map is loading..</CustomText>
          </View>
          <MapView
            initialRegion={{
              ...hotelInfo.marker,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            }}
            style={styles.mapStyle}
          >
            <Marker coordinate={hotelInfo.marker}>
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                colors={[COLORS.gradientOrange, COLORS.gradientPink]}
                style={styles.gradientMarker}
              >
                <CustomSvg name={"hSquare"} style={{ width: 15, height: 15 }} />
              </LinearGradient>
              {/* <Callout>
                          <CustomText>Go to hotel</CustomText>
                        </Callout> */}
            </Marker>
          </MapView>
        </View>
        <View style={styles.locationHolder}>
          <IconWbg
            style={{ ...styles.btnLocation, elevation: isGallery ? 0 : 5 }}
          />
          <CustomText
            style={{
              ...styles.textLocation,
              color: theme == "light" ? COLORS.grayDark : COLORS.gray,
            }}
          >
            {hotelInfo.city + ", " + hotelInfo.street + " st."}
          </CustomText>
        </View>
        <View style={styles.walkingHolder}>
          <IconWbg
            style={{ ...styles.btnLocation, elevation: isGallery ? 0 : 5 }}
            iconName={"walking"}
          />
          <CustomText
            style={{
              ...styles.textLocation,
              color: theme == "light" ? COLORS.grayDark : COLORS.gray,
            }}
          >
            {hotelInfo.distance}
          </CustomText>
        </View>
        <CustomButton
          title={"Select Rooms"}
          style={{ ...styles.btnSelect, elevation: isGallery ? 0 : 5 }}
          onPress={selectRoomsHandler}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.bgcLight,
  },
  gallery: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    zIndex: 2,
  },
  gradient: {
    width: "100%",
    height: screenH * 0.3,
    zIndex: -2,
    backgroundColor: COLORS.imgLoad,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  backBtn: {
    position: "absolute",
    left: 20,
    top: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.white,
  },
  likeBtn: {
    position: "absolute",
    right: 20,
    top: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  heartSvg: {
    height: "100%",
    width: "100%",
    color: COLORS.white,
  },
  maskGroupHolder: {
    height: screenH * 0.1,
    width: "100%",
    flexDirection: "row",
  },
  maskImg: {
    width: `${100 / 3}%`,
  },
  countHolder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
  },
  imgCount: {
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 25,
    fontFamily: "NunitoSemiBold",
  },
  titleHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // paddingVertical: screenH*0.03,
    height: screenH * 0.11,
  },
  titleText: {
    marginLeft: 20,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 30,
    color: COLORS.blackText,
  },
  rating: {
    marginRight: 20,
  },
  mapHolder: {
    width: "100%",
    height: screenH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  mapPreloader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grayDark,
  },
  mapLoading: {
    fontFamily: "NunitoBold",
    fontSize: 25,
    color: COLORS.gray,
  },
  gradientMarker: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  locationHolder: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenH * 0.03,
  },
  btnLocation: {
    marginLeft: 20,
    zIndex: 0,
  },
  textLocation: {
    fontSize: 16,
    fontFamily: "NunitoSemiBold",
    lineHeight: 22,
    color: COLORS.grayDark,
    marginLeft: 13,
  },
  walkingHolder: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenH * 0.016,
  },
  btnSelect: {
    fontFamily: "NunitoBold",
    fontSize: 24,
    marginHorizontal: 20,
    marginTop: screenH * 0.016,
    height: screenH * 0.086,
  },
});
