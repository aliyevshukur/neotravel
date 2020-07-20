import React from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { CustomText } from "../../components";
import COLORS from "../../styles/colors";
import gallery from "../../assets/images/Settings/gallery.png";
import camera from "../../assets/images/Settings/camera.png";

export const ImagePickerModal = ({ setIsShown, uploadImg }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() => {
          setIsShown(false);
          uploadImg(true);
        }}
        style={styles.pickerChoice}
      >
        <CustomText>Camera</CustomText>
        <Image source={camera} style={styles.pickerChoicePng} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsShown(false);
          uploadImg(false);
        }}
        style={styles.pickerChoice}
      >
        <CustomText>Gallery</CustomText>
        <Image source={gallery} style={styles.pickerChoicePng} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerChoice: {
    marginVertical: 10,
    flexDirection: "row",
  },
  pickerChoicePng: {
    width: 20,
    height: 20,
    marginLeft: "5%",
  },
});
