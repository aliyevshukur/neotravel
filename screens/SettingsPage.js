import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  getUserInfo,
  uploadProfilePhoto,
  selectUserPhotoUrl,
  selectUserName,
} from "../store/auth";
import fb from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import {
  getCameraPermissions,
  uploadImg,
} from "../store/userInfo.js/uploadImage";
import { CustomText, CustomButton, CustomInput } from "../components";
import COLORS from "../styles/colors";

const mapStateToProps = (state) => ({
  profilePhoto: selectUserPhotoUrl(state),
  userName: selectUserName(state),
});

export const SettingsPage = connect(mapStateToProps, { uploadProfilePhoto })(
  ({ navigation, uploadProfilePhoto, profilePhoto, userName }) => {
    const [profilePic, setProfilePic] = useState(profilePhoto);
    const [isUploading, setIsUploading] = useState(true);

    useEffect(() => {
      getUserInfo();
      setProfilePic(profilePhoto);
    }, [userName, profilePhoto]);

    const uploadImage = async () => {
      const permissionsGranted = await getCameraPermissions();
      if (permissionsGranted) {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });

        if (!result.cancelled) {
          const uploadedImg = await uploadImg(result.uri).then((link) => {
            fb.auth.currentUser
              .updateProfile({
                photoURL: link.url,
              })
              .then(() => {
                setProfilePic(link.url);
                uploadProfilePhoto(link.url);
                setIsUploading(true);
              })
              .catch(() => console.log("Error Happened"));
          });
        }
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onLongPress={() => {
              uploadImage();
              setIsUploading(false);
            }}
          >
            {isUploading ? (
              <Image style={styles.img} source={{ uri: profilePic }} />
            ) : (
              <ActivityIndicator
                style={[
                  styles.img,
                  { alignItems: "center", justifyContent: "center" },
                ]}
                size={"small"}
                color={COLORS.pink}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <CustomText style={styles.label}>Name</CustomText>
          <CustomInput
            isCross={false}
            isSearch={false}
            long={true}
            style={styles.input}
            value={userName.split(" ")[0]}
          />
          <CustomText style={styles.label}>Surname</CustomText>
          <CustomInput
            isCross={false}
            isSearch={false}
            long={true}
            style={styles.input}
            value={userName.split(" ")[1]}
          />
          <CustomButton
            style={styles.btn}
            title="Save"
            onPress={() => {
              getUserInfo();
              navigation.navigate({ name: "UserScreen" });
            }}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    marginVertical: "8%",
    alignSelf: "center",
    fontSize: 30,
    color: COLORS.gradientPink,
    fontFamily: "NunitoBold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  img: {
    width: Dimensions.get("window").height / 8,
    height: Dimensions.get("window").height / 8,
    backgroundColor: COLORS.grayDark,
    borderRadius: Dimensions.get("window").height / 16,
    marginBottom: "10%",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    width: "35%",
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    // marginVertical: "5%",
    // marginVertical: "8%",
    alignSelf: "center",
    fontSize: 22,
    color: COLORS.pink,
    fontFamily: "NunitoRegular",
  },
  input: {
    marginVertical: "5%",
  },
});
