import React from "react";
import { Text } from "react-native";

//possible fontFamily: "NunitoRegular"
//         fontFamily: "NunitoSemiBold"
//         fontFamily: "NunitoBold"
const fonts = {
  regular: "NunitoRegular",
  semiBold: "NunitoSemiBold",
  bold: "NunitoBold",
};
export const CustomText = ({ children, style, weight }) => {
  const font = style && style.fontFamily ? style.fontFamily : "NunitoRegular";

  return (
    <Text style={[style, { fontFamily: fonts[weight] || font }]}>
      {children}
    </Text>
  );

};
