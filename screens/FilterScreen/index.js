import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";

import { CustomSvg, CustomText } from "../../components";
import { CustomButton } from "../../components/CustomButton";
import COLORS from "../../styles/colors";
import { ToggleButton } from "../../components/ToggleButton";
import { SelectAlert } from "./SelectAlert";

export const FilterScreen = () => {
  const DATA = {
    budget: {
      fieldId: "budget", //must be same as object name
      name: "Your budget",
      selectables: ["$100+", "$200+", "$300+", "$400+", "$500+"],
    },
    rating: {
      fieldId: "rating",
      name: "Rating",
      selectables: ["1+", "2+", "3+", "3.5+", "4+", "4.5+", "5"],
    },
    reviewScore: {
      fieldId: "reviewScore",
      name: "Review score",
      selectables: ["1+", "2+", "3+", "3.5+", "4+", "4.5+", "5"],
    },
    meals: {
      fieldId: "meals",
      name: "Meals",
      selectables: ["Bozbash", "Dolma", "Dovgha"],
    },
    type: {
      fieldId: "type",
      name: "Type",
      selectables: ["Hotel", "Motel", "Hostel", "Inn"],
    },
    breakfast: {
      fieldId: "breakfast",
      name: "Breakfast included",
    },
    deals: {
      fieldId: "deals",
      name: "Deals",
    },
    available: {
      fieldId: "available",
      name: "Show only available",
    },
  };

  const [userChoices, setUserChoices] = useState({}); //values will be used as filter
  const [modal, setModal] = useState(false);
  const [selectProcess, setSelectProcess] = useState("");

  const selectHandler = (id) => {
    setSelectProcess(id);
    setModal(true);
  };

  const togleHandler = (id) => {
    setUserChoices({
      ...userChoices,
      [id]: userChoices[id] ? false : true,
    });
  };

  const resetHandler = () => {
    setUserChoices({});
  };

  const applyHandler = () => {
    // Take filter values from userChoices state
  };

  const goBackHandler = () => {
    // navigation go back
  };

  return (
    <View style={styles.container}>
      {modal ? (
        <SelectAlert
          selectInfo={{
            title: DATA[selectProcess].name,
            selectables: DATA[selectProcess].selectables,
          }}
          selectResult={(selected) =>
            setUserChoices({ ...userChoices, [selectProcess]: selected })
          }
          closeModal={() => setModal(false)}
        />
      ) : null}
      <View style={styles.header}>
        <View style={styles.titleHolder}>
          <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
            <CustomSvg name={"chevronLeft"} style={styles.chevronLeft} />
          </TouchableOpacity>
          <CustomText style={styles.titleText}>Filter</CustomText>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={resetHandler}>
          <CustomText style={styles.resetText}>Reset</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.main}>
        <FlatList
          data={Object.values(DATA)}
          renderItem={({ item }) => (
            <View style={styles.filterItem}>
              <CustomText style={styles.filterItemTitle}>
                {item.name}
              </CustomText>
              {item.selectables ? (
                <TouchableOpacity
                  style={styles.selectTouch}
                  onPress={() => selectHandler(item.fieldId)}
                >
                  <CustomText style={styles.selectText}>
                    {userChoices[item.fieldId] || "Select"}
                  </CustomText>
                  {userChoices[item.fieldId] ? null : (
                    <CustomSvg
                      name={"chevronRight"}
                      style={styles.chevronRight}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.selectTouch}>
                  <ToggleButton setValue={() => togleHandler(item.fieldId)} />
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.fieldId}
        />
      </View>
      <View style={styles.applyHolder}>
        <CustomButton title={"Apply"} width={338} onPress={applyHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.bgcLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 25,
  },
  titleHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    marginLeft: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.blackText,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.blackText,
  },
  resetBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 84,
    height: 38,
    borderRadius: 30,
    marginRight: 20,
    backgroundColor: COLORS.bgcLight,
    elevation: 5,
  },
  resetText: {
    fontFamily: "NunitoSemiBold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.grayDark,
    textTransform: "uppercase",
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.white,
  },
  main: {
    width: "100%",
    maxHeight: 480,
    paddingBottom: 24,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterItemTitle: {
    fontStyle: "normal",
    fontFamily: "NunitoSemiBold",
    fontSize: 20,
    lineHeight: 27,
    color: COLORS.blackText,
    marginLeft: 21,
    paddingTop: 16,
    paddingBottom: 16,
  },
  selectTouch: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 21,
  },
  selectText: {
    fontSize: 20,
    lineHeight: 27,
    fontStyle: "normal",
    color: COLORS.grayDark,
    marginRight: 14,
  },
  chevronRight: {
    width: 10,
    height: 18,
    color: COLORS.grayDark,
    opacity: 0.7,
  },
  applyHolder: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    zIndex: 1,
  },
});
