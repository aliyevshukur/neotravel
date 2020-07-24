import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";

import { CustomText } from "../../../components/CustomText";
import { CustomButton } from "../../../components/CustomButton";
import COLORS from "../../../styles/colors";
import { SmallCardSlider } from "../../../components";
import { mapStyleDark, mapStyleNormal } from "../../../styles/commonStyles";
import { useSelector } from "react-redux";

export const MapViewSearch = ({ hotels, navigation, bottomListStyle }) => {
  const texts = {
    markerCalloutName: "go to hotel",
  };

  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <View>
      <MapView
        style={styles.map}
        customMapStyle={theme == "light" ? mapStyleNormal : mapStyleDark}
        initialRegion={{
          ...hotels[0].marker,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {hotels.map((marker) => {
          const priceLength = marker.minPrice.length;
          let width = 84;
          let height = 40;
          let fontSize = 17;
          return (
            <Marker
              key={marker.id}
              coordinate={marker.marker}
              latitudeDelta={0.04}
              longitudeDelta={0.05}
            >
              <CustomButton
                style={[
                  styles.markerBtn,
                  priceLength < 8
                    ? { width: width, height: height, fontSize: fontSize }
                    : {
                        width: (width * (10 + priceLength / 2.9)) / 10,
                        height: height,
                        fontSize: 17,
                      },
                ]}
                title={`$${marker.minPrice}+`}
              />
              <Callout
                onPress={() =>
                  navigation.navigate("HotelScreen", { hotelInfo: marker })
                }
              >
                <View style={styles.markerCallView}>
                  <CustomText style={{ color: COLORS.gradientOrange }}>
                    {texts.markerCalloutName}
                  </CustomText>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <SmallCardSlider
        hotels={hotels}
        style={[styles.catalogueHorizontalMap, bottomListStyle]}
        onItemPress={(hotelInfo) =>
          navigation.navigate("HotelScreen", { hotelInfo })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  catalogueHorizontalMap: {
    height: 180,
    position: "absolute",
    bottom: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  markerBtn: {
    fontSize: 3,
    borderRadius: 40,
  },
  smallHotelCard: {
    marginLeft: 18,
  },
});
