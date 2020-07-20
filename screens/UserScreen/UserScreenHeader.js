import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { CustomText } from "../../components";
import COLORS from "../../styles/colors";
import fb from "../../firebaseConfig";
import { useSelector } from "react-redux";
import profileDefaultNormal from "../../assets/images/UserScreen/profilePhotoNormal.png";
import profileDefaultDark from "../../assets/images/UserScreen/profilePhotoDark.png";

export const UserScreenHeader = ({ profilePicture, fullName }) => {
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={styles.profilePicture}
          source={
            profilePicture
              ? { uri: profilePicture }
              : theme == "light"
              ? profileDefaultNormal
              : profileDefaultDark
          }
        />
      </View>
      <CustomText
        style={[
          styles.userName,
          theme == "light"
            ? { color: COLORS.blackText }
            : { color: COLORS.offWhite },
        ]}
      >
        {fullName}
      </CustomText>
    </View>
  );
  // : (
  //   <ActivityIndicator
  //     color={COLORS.gradientPink}
  //     size="small"
  //     style={{ alignItems: "center", justifyContent: "center" }}
  //   />
  // );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 7,
    alignItems: "center",
    width: width + 10,
    backgroundColor: COLORS.bgcLight,
    elevation: 5,
    marginTop: 7,
  },
  imageWrapper: {
    backgroundColor: "#0000",
    width: 70,
    height: 70,
    elevation: 5,
    borderRadius: 50,
    marginRight: 33,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    fontFamily: "NunitoBold",
  },
});
