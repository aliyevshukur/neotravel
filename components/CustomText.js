import React from "react";
import { Text } from "react-native";

//possible fontFamily: "NunitoRegular"
//         fontFamily: "NunitoSemiBold"
//         fontFamily: "NunitoBold"
export const CustomText = ({ children, style }) => {
  const font = style && style.fontFamily ? style.fontFamily : "NunitoRegular";
  return <Text style={[style, { fontFamily: font }]}>{children}</Text>;
};
