import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
} from "react-native";
import fb from '../../firebaseConfig';
import { useSelector } from "react-redux";

import { CustomText, CustomSvg } from "../../components";
import COLORS from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { PaymentItem } from "./PaymentItem";

const screenWidth = Dimensions.get("window").width;

export const PaymentsScreen = () => {
  const theme = useSelector((state) => state.themeReducer).theme;

  const currentUserId = fb.auth.currentUser.uid;
  const arrayId = [];
  const [payments, setPayments] = useState([]);

  async function getPaymentsFromFirebase () {
    try{
      const snapshot = await fb.db.collection('reservations').where('userId', '==', "sTrusiVbFaS17ADwhfqOu4AzZdv2").get();
      if (snapshot.empty) {
        console.log('reservation not found');
        return;
      } else {
        
        snapshot.forEach(doc => {
          arrayId.push(doc.data().roomId);
        });
      }
      const resultRooms = [];
      arrayId.forEach(id => {
        const roomRef = fb.db.collection('rooms').doc(id);
        roomRef.get().then(function(doc) {
          if (doc.exists) {
            setPayments(
              [
                ...resultRooms,
                {
                  id: doc.id,
                  hotelName: "Fairmont Baku",
                  roomName: doc.data().name,
                  price: doc.data().price,
                  currency: doc.data().currency,
                  date: "04/05/20",
                  imgUrl: doc.data().images[0],
                }
              ]
            );
            resultRooms.push({
              id: doc.id,
              hotelName: "Fairmont Baku",
              roomName: doc.data().name,
              price: doc.data().price,
              currency: doc.data().currency,
              date: "04/05/20",
              imgUrl: doc.data().images[0],
            })

          } else {
              console.log("No such document!");
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPaymentsFromFirebase();
  }, []);



  // const DATA = [
  //   {
  //     hotelName: "Fairmont Baku",
  //     roomName: "Double Room",
  //     price: 2000,
  //     currency: "AZN",
  //     date: "04/05/20",
  //     imgUrl:
  //       "https://r-cf.bstatic.com/images/hotel/max1024x768/140/140205644.jpg",
  //   },
  //   {
  //     hotelName: "Radisson",
  //     roomName: "Twin room",
  //     price: 3000,
  //     currency: "$",
  //     date: "04/05/20",
  //     imgUrl:
  //       "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  //   },
  // ];

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <View
        style={{
          ...styles.main,
          backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
        }}
      >
        <FlatList
          style={styles.paymentList}
          data={payments}
          renderItem={({ item, index }) => (
            <PaymentItem theme={theme} key={index} paymentInfo={item} />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ margin: 20 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.bgcLight,
  },
  header: {
    width: "100%",
    paddingTop: 50,
  },
  gradientHeader: {
    position: "absolute",
    top: -880,
    left: -(1000 - screenWidth) / 2,
    width: 1000,
    height: 1000,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    elevation: 5,
    zIndex: -1,
  },
  titleHolder: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 15,
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
    color: COLORS.offWhite,
  },
  titleText: {
    marginLeft: 24,
    fontFamily: "NunitoBold",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 38,
    color: COLORS.offWhite,
  },
  main: {
    width: "100%",
    paddingBottom: 90,
  },
  paymentList: {
    paddingTop: 40,
  },
});
