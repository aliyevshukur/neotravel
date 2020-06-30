import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomSvg } from "../../components";
import { logOut } from "../../store/auth";
import { connect } from "react-redux";


export const UserMenuItem = connect(null, { logOut })(
  ({ icon, label, logOut }) => {
    return (
      <TouchableOpacity onPress={logOut}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <CustomSvg name={icon} gradient={true} style={styles.svg}/>
          </View>
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 35,
  },
  icon: {
    width: 21,
    height: 17,
    marginRight: 14,
    height: 17,
    width: 21,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
});
