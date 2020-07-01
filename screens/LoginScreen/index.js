import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";
import { sign, selectAuthStatus } from "../../store/auth";

const myStateToProps = (state) => ({
  status: selectAuthStatus(state),
});

export const LoginScreen = connect(myStateToProps, { sign })(
  ({ navigation, sign, status }) => {
    const [formValues, setFormValues] = useState({
      email: "",
      password: "",
    });

    useEffect(() => {
      if (status) navigation.navigate("BottomTabNav");
    }, [status]);

    const handleFieldChange = (name, value) => {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleFormSubmit = async () => {
      for (let field in formValues) {
        if (formValues[field].trim() === "") {
          Alert.alert(
            `${
              field.charAt(0).toUpperCase() + field.slice(1, field.length)
            } field is required to fill` 
          );
          return;
        }
      }

      await sign(formValues.email, formValues.password, false);
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
              onChangeText={(value) => handleFieldChange("email", value)}
              long={true}
            />
            <CustomInput
              placeholder="Password"
              isSearch={false}
              isCross={false}
              value={formValues.password}
              onChangeText={(value) => handleFieldChange("password", value)}
              long={true}
            />
          </View>
          <View style={styles.textWrapper}>
            <CustomText style={styles.text}>Don't have an account?</CustomText>
            <TouchableOpacity
              onPress={() => {
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
