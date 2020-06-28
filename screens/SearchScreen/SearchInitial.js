import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Picker,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";

import COLORS from "../../styles/colors";
import { CustomInput, CustomText } from "../../components";
import { AppLayout } from "../../commons/AppLayout";
import { CardSlider } from "../../components";

import filterPng from "../../assets/images/homeScreen/Filter.png";
import { ScrollView } from "react-native-gesture-handler";

export const SearchInitial = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOnSearch, setIsOnSearch] = useState(false);
  const [listType, setListType] = useState("map");
  const texts = {
    navRight: "Filter",
    navLeft: {
      map: "Map",
      list: "List",
    },
  };

  const submitSearchHandler = (val) => {
    if (searchValue.trim() !== "") {
      setIsOnSearch(false);
    } else {
      setIsOnSearch(true);
      console.log("submitSearchHandler ---- worked ");
    }
  };

  return (
    <ScrollView>
      <AppLayout style={styles.container}>
        <CustomInput
          returnKeyType="go"
          onSubmitEditing={() => submitSearchHandler()}
          onChangeText={setSearchValue}
          value={searchValue}
          style={{ marginTop: 30, marginBottom: 33 }}
          long={true}
          placeHolder="Search for a city, area, or a hotel"
        />
        {!isOnSearch ? (
          <>
            <CardSlider
              title="recommended"
              titleStyle={styles.recommendedTitleStyle}
              containerStyle={styles.recommendedContainerStyle}
            />
            <CardSlider
              title="deals"
              titleStyle={styles.dealsTitleStyle}
              containerStyle={styles.dealsContainerStyle}
            />
          </>
        ) : (
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <Picker style={styles.picker} mode="dropdown">
                <Picker.Item
                  label={"SF, USA - 2 guests - Jan 18 to Jan 23"}
                  value={"1"}
                />
                <Picker.Item
                  label={"SF, USA - 3 guests - Jan 20 to Jan 25"}
                  value={"2"}
                />
              </Picker>
            </View>
            <View style={styles.headNav}>
              <View style={styles.headNavFilter}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image source={filterPng} style={styles.filterPng} />
                  <CustomText style={styles.filterTxt}>
                    {texts.navRight}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  setListType((v) => (v === "map" ? (v = "list") : (v = "map")))
                }
              >
                <CustomText style={styles.listTypeName}>
                  {listType === "map" ? texts.navLeft.map : texts.navLeft.list}
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              {listType === "list" ? <View /> : <View />}
            </View>
          </View>
        )}
      </AppLayout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  recommendedContainerStyle: {
    backgroundColor: COLORS.bgcDark,
  },
  recommendedTitleStyle: {
    color: COLORS.bgcLight,
    marginTop: 30,
  },

  dealsTitleStyle: {
    color: COLORS.bgcDark,
    marginTop: 21,
  },
});
