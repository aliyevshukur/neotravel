import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";

export const LoginScreen = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    navigation.navigate("BottomTabNav");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomText style={styles.header}>Login</CustomText>

        <View style={styles.loginForm}>
          <CustomInput
            placeholder="Email"
            isSearch={false}
            isCross={false}
            value={formValues.email}
            onChangeText={() => handleFieldChange("email", value)}
            long={true}
          />
          <CustomInput
            placeholder="Password"
            isSearch={false}
            isCross={false}
            value={formValues.password}
            onChangeText={() => handleFieldChange("password", value)}
            long={true}
          />
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.text}>Don't have an account?</CustomText>
          <TouchableOpacity
            onPress={() => {
              console.log("inside onPress");
              navigation.navigate("Register");
            }}
          >
            <CustomText style={styles.link}> Register.</CustomText>
          </TouchableOpacity>
        </View>
        <CustomButton
          style={styles.btn}
          onPress={handleFormSubmit}
          title={"Login"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "flex-start",
  },
  header: {
    fontSize: 40,
    color: COLORS.pink,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginForm: {},
  btn: {
    width: 200,
    height: 55,
    fontSize: 20,
    marginTop: 15,
  },
  textWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    color: COLORS.gray,
  },
  link: {
    color: COLORS.pink,
  },
});
