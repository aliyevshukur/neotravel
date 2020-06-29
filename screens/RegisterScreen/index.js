import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";

export const RegisterScreen = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const fromFields = ["name", "surname", "email", "password"];

  const handleFieldChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    console.log("formValues:", formValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomText style={styles.header}>Register</CustomText>

        <View style={styles.loginForm}>
          {fromFields.map((key, index) => {
            console.log("key", key);

            return (
              <CustomInput
                key={index}
                isCross={false}
                isSearch={false}
                placeholder={
                  key.charAt(0).toUpperCase() + key.slice(1, key.length)
                }
                value={formValues[key]}
                onChangeText={(value) => handleFieldChange(key, value)}
                long={true}
              />
            );
          })}
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.text}>Already registered?</CustomText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <CustomText style={styles.link}> Login.</CustomText>
          </TouchableOpacity>
        </View>
        <CustomButton
          style={styles.btn}
          onPress={handleFormSubmit}
          title={"Register"}
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
