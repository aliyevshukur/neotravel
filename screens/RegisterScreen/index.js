import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomButton, CustomInput, CustomText } from "../../components";

export const RegisterScreen = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
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
        {Object.keys(formValues).map((key) => (
          <CustomInput
            placeholder={key.charAt(0).toUpperCase()}
            value={formValues[key]}
            onChangeText={() => handleFieldChange(key, value)}
            long={true}
          />
        ))}
      </View>
      <CustomText>
        Already registered?
        <TouchableOpacity onClick={() => navigation.navigate("Login")}>
          <CustomText>Login.</CustomText>
        </TouchableOpacity>
      </CustomText>
      <CustomButton style={styles.btn} onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginForm: {},
  btn: {
    width: "80%",
  },
});
