import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import fb from '../../firebaseConfig';

import { CustomSvg, CustomText, RoomLarge } from "../../components";
import COLORS from "../../styles/colors";

import {useSelector} from 'react-redux';

export const RoomScreen = ({navigation, route}) => {
  const theme = useSelector(state => state.themeReducer).theme;
  const {hotelId, hotelName} = route?.params;

  const [rooms, setRooms] = useState([]);

  async function getRoomsFromFirebase () {
    try{
      const snapshot = await fb.db.collection('rooms').where('hotelID', '==', hotelId).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      } else {
        const resultFromDb = [];
        snapshot.forEach(doc => {
          resultFromDb.push({
            id: doc.id,
            name: doc.data().name,
            imgUrl: doc.data().images[0],
            price: doc.data().price,
            currency: doc.data().currency,
            time: "x",
            features: doc.data().features,
            description: doc.data().description,
          });
        });
        setRooms(resultFromDb);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoomsFromFirebase();
  }, []);

  const goBackHandler = () => {
    navigation.goBack();
  };

  const infoHandler = (id) => {
    const index = rooms.findIndex((item) => item.id == id);

    Alert.alert(
      `${rooms[index].name}`,
      `${rooms[index].description}`,
      [{ text: "OK" }],
      { cancelable: true }
    );
  };
  const selectHandler = (id) => {
    navigation.navigate("ReservationScreen", { roomId: id });
  };

  return (
    <View style={{...styles.container, backgroundColor: theme=="light" ? COLORS.grayLight : COLORS.bgcDark}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
          <CustomSvg name={"chevronLeft"} style={{...styles.chevronLeft, color: theme=="light" ? COLORS.blackText : COLORS.white}} />
        </TouchableOpacity>
        <CustomText style={{...styles.titleText, color: theme=="light" ? COLORS.blackText : COLORS.white}}>{hotelName}</CustomText>
      </View>
      <View style={styles.main}>
        <FlatList
          data={rooms}
          style={styles.flatList}
          renderItem={({ item }) => (
            <RoomLarge
              style={styles.roomItem}
              cardInfo={item}
              onInfoPress={() => infoHandler(item.id)}
              onSelectPress={() => selectHandler(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ margin: 10 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgcLight,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 20,
  },
  backBtn: {
    marginLeft: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  chevronLeft: {
    height: "100%",
    width: "100%",
    color: COLORS.blackText,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.blackText,
  },
  main: {
    paddingBottom: 100,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  roomItem: {
    marginBottom: 20,
  },
});
