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
      <CustomText style={styles.label}>Name</CustomText>
      <CustomInput
        isCross={false}
        isSearch={false}
        long={true}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <CustomText style={styles.label}>Surname</CustomText>
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
      <CustomButton
        style={styles.btn}
        title="Save"
        onPress={() => {
          saveHandler();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: "center",
    fontSize: 22,
    color: COLORS.pink,
    fontFamily: "NunitoRegular",
  },
  input: {
    marginVertical: "4%",
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  darkModeText: {
    fontSize: 18,
    fontFamily: "NunitoBold",
    marginRight: 10,
  },
  btn: {
    width: "35%",
    height: "13%",
    marginTop: "5%",
    fontSize: 21,
  },
});
