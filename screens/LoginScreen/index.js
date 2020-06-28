import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomButton, CustomInput, CustomText } from "../../components";

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
    console.log("submti");
  };

  return (
    <View style={styles.container}>
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
      {/* <CustomText>
        Don't have an account?
        <TouchableOpacity onClick={() => navigation.navigate("Register")}>
          <CustomText>Register</CustomText>
        </TouchableOpacity>
      </CustomText> */}
      <CustomButton
        style={styles.btn}
        onPress={handleFormSubmit}
        title={"Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loginForm: {},
  btn: {
    width: "80%",
    fontSize: 20,
  },
});
