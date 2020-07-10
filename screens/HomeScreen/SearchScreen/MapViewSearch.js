import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";

import { CustomText } from "../../../components/CustomText";
import { CustomButton } from "../../../components/CustomButton";
import COLORS from "../../../styles/colors";
import { SmallCardSlider } from "../../../components";

export const MapViewSearch = ({ hotels, navigation, bottomListStyle }) => {
  const texts = {
    markerCalloutName: "go to hotel",
  };
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View>
      <MapView
        style={styles.map}
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
              //   title={marker.title}
              //   description={marker.description}
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
                onPress={() => navigation.navigate({ name: "HotelScreen" })}
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
  markerCallView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  map: {
    // flex: 1,
    width: Dimensions.get("window").width,
    height: "100%",
    // alignItems: "flex-end",
  },
  markerBtn: {
    // width: 120,
    // height: 40,
    fontSize: 3,
    borderRadius: 40,
  },
  smallHotelCard: {
    marginLeft: 18,
  },
});
