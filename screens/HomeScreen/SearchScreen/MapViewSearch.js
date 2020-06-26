import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";

import { CustomText } from "../../../components/CustomText";
import { CustomButton } from "../../../components/CustomButton";
import { HotelSmall } from "../../../components/cards/HotelSmall";
import COLORS from "../../../styles/colors";

export const MapViewSearch = ({ hotels }) => {
  const texts = {
    markerCalloutName: "go to hotel",
  };
  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {hotels.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.latlng}
            //   title={marker.title}
            //   description={marker.description}
          >
            <CustomButton
              style={styles.markerBtn}
              title={`$${marker.price}+`}
            />
            <Callout onPress={() => alert("yes")}>
              <View style={styles.markerCallView}>
                <CustomText style={{ color: COLORS.gradientOrange }}>
                  {texts.markerCalloutName}
                </CustomText>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.catalogueHorizontalMap}>
        <FlatList
          data={hotels}
          horizontal={true}
          renderItem={({ item }) => (
            <HotelSmall
              cardInfo={{
                imgUrl:
                  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                price: "2500",
                name: "River Side",
                rating: "4.5",
              }}
              style={styles.smallHotelCard}
              key={item.id}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  catalogueHorizontalMap: {
    height: 180,
    position: "absolute",
    bottom: 60,
  },
  markerCallView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: "100%",
  },
  markerBtn: {
    width: 84,
    height: 35,
    fontSize: 17,
    borderRadius: 40,
  },
  smallHotelCard: {
    marginLeft: 18,
  },
});
