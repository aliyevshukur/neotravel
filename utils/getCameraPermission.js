import * as Permissions from "expo-permissions";

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
