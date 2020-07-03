import React from "react";
import * as Permissions from "expo-permissions";
import fb from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getUserInfo, setUserProfilePhoto } from "../auth";

// const getPermission = async () => {
//   const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
//   if (status !== "granted") {
//     alert(
//       "Hey! You might want to enable notifications for my app to upload images"
//     );
//   }
// };

// export const uploadImage = async () => {
//   const permissionsGranted = await getCameraPermissions();
//   if (permissionsGranted) {
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//     });

//     if (!result.cancelled) {
//       const uploadedImg = await uploadImg(result.uri).then((link) => {
//         fb.auth.currentUser
//           .updateProfile({
//             photoURL: link.url,
//           })
//           .then(() => {
//             console.log(fb.auth.currentUser.photoURL);
//           })
//           .catch(() => console.log("Error Happened"));
//       });
//     }
//   }
// };

export async function uploadImg(uri) {
  try {
    const image = {
      name: uri.split("/").pop(),
      type: `image/${uri.split(".").pop()}`,
      uri,
    };

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dflogslqa/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("uploadImg err", error);
  }
}

export async function getCameraPermissions() {
  try {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("You need give permissions to be able add images");
      return false;
    }

    return true;
  } catch (error) {
    console.log("getCameraPermissions", error);
  }
}
