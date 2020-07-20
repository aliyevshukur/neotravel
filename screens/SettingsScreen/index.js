import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect, useSelector } from "react-redux";

import {
  uploadProfilePhoto,
  selectUserPhotoUrl,
  selectUserName,
  updateUserName,
} from "../../store/auth";
import fb from "../../firebaseConfig";

import { CustomText } from "../../components";
import profileDefaultNormal from "../../assets/images/UserScreen/profilePhotoNormal.png";
import profileDefaultDark from "../../assets/images/UserScreen/profilePhotoDark.png";
import { uploadImg } from "../../utils/imageUpload";
import { getCameraPermissions } from "../../utils/getCameraPermission";
import { ImagePickerModal } from "./ImagePickerModal";
import COLORS from "../../styles/colors";
import { UserInfo } from "./UserInfo";
import { shadow } from "../../styles/commonStyles";

const mapStateToProps = (state) => ({
  profilePhoto: selectUserPhotoUrl(state),
  userName: selectUserName(state),
});

export const SettingsPage = connect(mapStateToProps, {
  uploadProfilePhoto,
  updateUserName,
})(
  ({
    navigation,
    uploadProfilePhoto,
    profilePhoto,
    userName,
    updateUserName,
  }) => {
    const [isUploading, setIsUploading] = useState(true);
    const [name, setName] = useState(userName.split(" ")[0]);
    const [surname, setSurname] = useState(userName.split(" ")[1]);
    const [isModalShown, setIsModalShown] = useState(false);

    const theme = useSelector((state) => state.themeReducer).theme;

    //Save Handler that set name and surname as userName of user
    const saveHandler = async () => {
      const changedUserName = name.concat(" ", surname);
      fb?.auth?.currentUser
        .updateProfile({
          displayName: changedUserName,
        })
        .then(() => {
          updateUserName(fb?.auth?.currentUser?.displayName);
        })
        .then(() => navigation.navigate({ name: "user" }));
    };

    //Handler that opens camera or gallery depending on case and upload image to FireStore and Redux
    const uploadImage = async (isCameraSelected) => {
      const permissionsGranted = await getCameraPermissions();
      if (permissionsGranted) {
        const result = isCameraSelected
          ? await ImagePicker.launchCameraAsync({
              quality: 0.5,
              allowsEditing: true,
              aspect: [1, 1],
            })
          : await ImagePicker.launchImageLibraryAsync({
              quality: 0.5,
              allowsEditing: true,
              aspect: [1, 1],
            });

        if (!result.cancelled) {
          const uploadedImg = await uploadImg(result.uri).then((link) => {
            fb?.auth?.currentUser
              .updateProfile({
                photoURL: link.url,
              })
              .then(() => {
                uploadProfilePhoto(fb?.auth?.currentUser?.photoURL);
                setIsUploading(true);
              })
              .catch(() => console.log("Error Happened"));
          });
        }
      }
    };

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        <View style={styles.profileContainer}>
          {isUploading ? (
            <TouchableOpacity
              onLongPress={async () => {
                setIsModalShown(true);
                setIsUploading(false);
              }}
              style={{ width: "100%", height: "100%", borderRadius: 75 }}
            >
              <Image
                style={styles.img}
                source={
                  profilePhoto
                    ? { uri: profilePhoto }
                    : theme == "light"
                    ? profileDefaultNormal
                    : profileDefaultDark
                }
              />
            </TouchableOpacity>
          ) : isModalShown ? (
            <ImagePickerModal
              isShown={isModalShown}
              setIsShown={setIsModalShown}
              uploadImg={uploadImage}
            />
          ) : (
            <ActivityIndicator
              style={[
                styles.indicator,
                { alignItems: "center", justifyContent: "center" },
              ]}
              size={"small"}
              color={COLORS.pink}
            />
          )}
        </View>
        <UserInfo
          name={name}
          surname={surname}
          setName={setName}
          setSurname={setSurname}
          saveHandler={saveHandler}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.bgcLight,
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#0000",
    elevation: 3,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    marginBottom: "10%",
  },
  indicator: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
});
