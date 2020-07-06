import React from "react";
import { View, StyleSheet } from "react-native";
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
        <CustomText style={styles.darkModeText}>Dark mode</CustomText>
        <ToggleButton setValue={() => {}} />
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
    fontSize: 22,
  },
});
