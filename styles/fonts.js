import * as Font from "expo-font";

import NunitoRegular from "../assets/fonts/Nunito-Regular.ttf";
import NunitoSemiBold from "../assets/fonts/Nunito-SemiBold.ttf";
import NunitoBold from "../assets/fonts/Nunito-Bold.ttf";

export const loadFonts = () => {
  return Font.loadAsync({
    NunitoRegular,
    NunitoSemiBold,
    NunitoBold,
  });
};