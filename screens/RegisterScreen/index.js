import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { connect, useSelector } from "react-redux";

import { CustomButton, CustomInput, CustomText } from "../../components";
import COLORS from "../../styles/colors";
import { sign } from "../../store/auth";

export const RegisterScreen = connect(null, { sign })(
  ({ navigation, sign }) => {
    const [formValues, setFormValues] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });

    // Data for looping input fields
    const fromFields = ["name", "surname", "email", "password"];
    
    const theme = useSelector(state => state.themeReducer).theme;

    const handleFieldChange = (name, value) => {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    // Check if inputs are valid and create new account
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
      <>
        <View style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}}>
          <View style={styles.wrapper}>
            <CustomText style={styles.header}>Register</CustomText>

            <View style={styles.loginForm}>
              {fromFields.map((key, index) => {
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
                    secureTextEntry={ key === 'password' ? true : false}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <CustomText>Registiration has been completed</CustomText>
        </Modal>
      </>
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
