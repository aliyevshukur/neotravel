import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/theme";

import {
  CustomText,
  CustomInput,
  ToggleButton,
  CustomButton,
} from "../../components";
import COLORS from "../../styles/colors";

export const UserInfo = ({
  name,
  surname,
  setName,
  setSurname,
  saveHandler,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer).theme;

  const darkHandler = (value) => {
    value ? dispatch(setTheme("dark")) : dispatch(setTheme("light"));
  };

  return (
    <View style={styles.userInfo}>
      <View style={styles.labelWrapper}>
        <CustomText style={styles.label}>Name</CustomText>
      </View>
      <CustomInput
        isCross={false}
        isSearch={false}
        long={true}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.labelWrapper}>
        <CustomText style={styles.label}>Surname</CustomText>
      </View>
      <CustomInput
        isCross={false}
        isSearch={false}
        long={true}
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />
      <View style={styles.darkModeContainer}>
        <CustomText
          style={{
            ...styles.darkModeText,
            color: theme == "light" ? COLORS.blackText : COLORS.gray,
          }}
        >
          Dark mode
        </CustomText>
        <ToggleButton
          value={!(theme == "light")}
          setValue={(value) => {
            darkHandler(value);
          }}
        />
      </View>
      <View style={styles.saveButtonWrapper}>
        <CustomButton
          style={styles.btn}
          title="Save"
          onPress={() => {
            saveHandler();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    width: '100%',
  },
  label: {
    fontSize: 22,
    color: COLORS.pink,
    fontFamily: "NunitoRegular",
  },
  lableWrapper: {},
  input: {
    width: "100%",
    marginBottom: 7,
  },
  darkModeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  darkModeText: {
    fontSize: 18,
    fontFamily: "NunitoBold",
    marginRight: 10,
  },
  btn: {
    width: "35%",
    height: "100%",
    marginTop: "5%",
    fontSize: 21,
  },
  saveButtonWrapper: {
    width: "100%",
    height: "13%",
    alignItems: "center",
  },
});
