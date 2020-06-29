import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { sign, logOut } from "../../store/auth";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";

export const RegisterScreen = connect(null, { sign, logOut })(
  ({ navigation, sign, logOut }) => {
    const [formValues, setFormValues] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });

    const handleFieldChange = (name, value) => {
      setFormValues((formValues) => ({
        ...formValues,
        [name]: value,
      }));
    };

    const handleFormSubmit = () => {
      for (let field in formValues) {
        if (formValues[field].trim() === "") {
          Alert.alert(`${field} required to fill`);
          return;
        }
      }
      sign(
        formValues.email,
        formValues.password,
        true,
        formValues.name.concat(" ", formValues.surname)
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <CustomText style={styles.header}>Register</CustomText>
          <View style={styles.loginForm}>
            <CustomInput
              isCross={false}
              isSearch={false}
              placeholder="Name"
              value={formValues.name}
              onChangeText={(value) => handleFieldChange("name", value)}
              long={true}
            />
            <CustomInput
              isCross={false}
              isSearch={false}
              placeholder="Surname"
              value={formValues.surname}
              onChangeText={(value) => handleFieldChange("surname", value)}
              long={true}
            />
            <CustomInput
              isCross={false}
              isSearch={false}
              placeholder="Email"
              value={formValues.email}
              onChangeText={(value) => handleFieldChange("email", value)}
              long={true}
            />
            <CustomInput
              isCross={false}
              isSearch={false}
              placeholder="Password"
              value={formValues.password}
              onChangeText={(value) => handleFieldChange("password", value)}
              long={true}
            />
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
  }
);

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
