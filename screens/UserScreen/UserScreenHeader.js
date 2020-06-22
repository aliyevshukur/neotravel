import React from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";

import { shadow } from "../../styles/commonStyles";

export const UserScreenHeader = ({ profilePicture, fullName }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profilePicture} source={profilePicture} />
      <Text>{fullName}</Text>
    </View>
  );
};

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height; 

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 23,
    paddingVertical: 11,
    alignItems: "center",
    width: width + 5,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    ...shadow,
  },
  profilePicture: {
    borderRadius: 50,
    marginRight: 28,
    width: 60,
    height: 60,
  },
});
