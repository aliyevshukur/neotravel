import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import fb from "../../firebaseConfig";


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { CustomButton, CustomText, CustomSvg } from "../../components";
import { ProgressBar } from "./components/ProgressBar";
import { ReservationContent } from "./components/ReservationContent";
import COLORS from "../../styles/colors";


import { connect, useSelector} from "react-redux";
import {
  selectReserveData,
  selectCompleted,
  setReservedFb,
  setRoomAndUserID,
  setReserveInfo,
  setCustomerInfo,
  setCardInfo,
  setCompletedRoomInfo,
  setCompletedHotelInfo,
  setCompletedUserInfo,
  setCompletedReserveInfo,
} from '../../store/reservation';

const mapStateToProps = (state) => ({
  reservation: selectReserveData(state),
  completedValues: selectCompleted(state),
});



export const ReservationScreen = connect(mapStateToProps, {
  setReservedFb,
  setRoomAndUserID,
  setReserveInfo,
  setCustomerInfo,
  setCardInfo,
  setCompletedRoomInfo,
  setCompletedHotelInfo,
  setCompletedUserInfo,
  setCompletedReserveInfo,
})(({
  navigation,
  route,
  reservation,
  completedValues,
  setReservedFb,
  setRoomAndUserID,
  setReserveInfo,
  setCustomerInfo,
  setCardInfo,
  setCompletedRoomInfo,
  setCompletedHotelInfo,
  setCompletedUserInfo,
  setCompletedReserveInfo,
}) => {

  const currentUserId = fb.auth.currentUser.uid;
  

  const [stageNumber, setStageNumber] = useState(1);
  const [buttonTitle, setButtonTitle] = useState("");
  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(false);

  const [reserveFormValues, setReserveFormValues] = useState({
    guests: "",
    dateRange: {},
  });

  const [userFormValues, setUserFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postCode: "",
    country: "",
    mobilePhone: "",
  });

  const [cardFormValues, setCardFromValues] = useState({
    cardNumber: "",
    expiry: "",
    CVV: null,
    name: "",
  });

  const theme = useSelector(state => state.themeReducer).theme;


  const goBackHandler = () => {
    if (stageNumber === 1) {
      navigation.goBack();

    } else setStageNumber(stageNumber -1);
  }

  
  const handleReserveFieldChange = (name, value) => {
    setReserveFormValues({
      ...reserveFormValues,
      [name]: value,
    });
  };
  const handleUserFieldChange = (name, value) => {
    setUserFormValues({
      ...userFormValues,
      [name]: value,
    });
  };

  const handleCardFieldChange = (name, value) => {
    if (name === "cardNumber") {
      value = String(value);
    }

    if ((name === "cardNumber" || name === "CVV") && isNaN(value)) {
      return;
    }
    if(name=="expiry" && value.length==2) {
      setCardFromValues({
        ...cardFormValues,
        [name]: value+ "/",
      });
      return;
    }

    setCardFromValues({
      ...cardFormValues,
      [name]: value,
    });
  };

  const handleButtonPress = () => {
    switch (stageNumber) {
      case 1:
        if(reserveFormValues.guests && reserveFormValues.dateRange.startDate && reserveFormValues.dateRange.endDate){
          setReserveInfo(reserveFormValues);
          checkMaxGuests(reserveFormValues.guests);
        }
        break;
      case 2:
        const {firstName, lastName, email, address, postCode, country, mobilePhone,} = userFormValues;
        if(
          firstName.trim()&&
          lastName.trim()&&
          email.trim()&&
          address.trim()&&
          postCode.trim()&&
          country.trim()&&
          mobilePhone.trim()
        ){
          setStageNumber(3);
          setCustomerInfo(userFormValues);
        }
        break;
      case 3:
        const {cardNumber, expiry, CVV, name} = cardFormValues;
        if(cardNumber.trim().length==16 && expiry.trim().length>4&&CVV.trim().length==3&&name.length>0){
          setStageNumber(4);
          setCardInfo(cardFormValues);
        }
        break;
      case 4:
        setReservedFb(reservation);
        navigation.navigate('AccountStack', { screen: 'payments' });
    }
  };


  function checkMaxGuests (guests) {
    const docRef = fb.db.collection('rooms').doc(route?.params?.roomId);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          if(doc.data().maxGuests < guests) {
            Alert.alert(
              "Info",
              "Selected guests is more than room capacity. You can change number of guests or search for another room.",
              [
                { text: "Ok", onPress: () => {} }
              ],
              { cancelable: true }
            )
          } else {
            checkIfRoomReserved({
              roomId: reservation.roomId,
              startDate: new Date(reserveFormValues.dateRange.startDate).getTime(),
              endDate: new Date(reserveFormValues.dateRange.endDate).getTime(),
            });
          }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  async function checkIfRoomReserved (data) {
    let currentTime = new Date().getTime();
    try{
      const snapshot = await fb.db.collection('reservations').where('endDate', '>', currentTime).where('roomId', '==', data.roomId).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        setStageNumber(2);
        setCompletedReserveInfo(reserveFormValues);
        return;
      }
      snapshot.forEach(doc => {        
        if((doc.data().startDate >= data.startDate && doc.data().startDate <= data.endDate)
        ||
        (doc.data().endDate >= data.startDate && doc.data().endDate <= data.endDate)
        ||
        (data.startDate <= doc.data().startDate && data.endDate >= doc.data().endDate)
        ) {
          Alert.alert(
            "Info",
            "This room is reserved in selected time interval, please choose different time or search for another room",
            [
              { text: "Ok", onPress: () => {} }
            ],
            { cancelable: true }
          )
          console.log("reserved");
          return;
        } else {
          setStageNumber(2);
          setCompletedReserveInfo(reserveFormValues);
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  function getRestRoomDataFb (roomId) {
    const docRef = fb.db.collection('rooms').doc(roomId);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          const roomData = doc.data();
          setCompletedRoomInfo({
            roomName: roomData.name,
            imgUrl: roomData.images[0],
            price: roomData.price,
            currency: roomData.currency,
            description: roomData.description,
          });
            getRestHotelDataFb(roomData.hotelID);
            getRestUserDataFb (currentUserId, roomData.hotelID)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such room document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
  }

  function getRestHotelDataFb (hotelId) {
    const hotelRef = fb.db.collection('hotels').doc(hotelId);
    hotelRef.get().then(function(doc) {
      if (doc.exists) {
        const hotelData = doc.data();
        setCompletedHotelInfo({
          hotelName: hotelData.name,
          rating: hotelData.rating,
        })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such hotel document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  function getRestUserDataFb (userId, hotelId) {
    const userRef = fb.db.collection('users').doc(userId);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        const userData = doc.data();
        setCompletedUserInfo({
          isLiked: userData.favorites.includes(hotelId),
        })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such user document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  useEffect(() => {
    setRoomAndUserID({
      userId: currentUserId,
      roomId: route?.params?.roomId,
      // roomId: "0a9lrJ8egawN5SRcXvgU",
    });

    getRestRoomDataFb(route?.params?.roomId);

  }, [])


  useEffect(() => {
    switch (stageNumber) {
      case 1:
        setButtonTitle("Go to Customer Info");
        break;
      case 2:
        setButtonTitle("Go to Payment");
        break;
      case 3:
        setButtonTitle("Go to Confirmation");
        break;
      case 4:
        setButtonTitle("Complete");
    }
  }, [stageNumber]);

  


  return (
    <KeyboardAwareScrollView style={{width: "100%"}} >
    <View style={{...styles.container, backgroundColor: theme=="light" ? COLORS.bgcLight : COLORS.bgcDark}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
          <CustomSvg name={"chevronLeft"} style={{...styles.chevronLeft, color: theme=="light" ? COLORS.blackText : COLORS.white}} />
        </TouchableOpacity>
        <CustomText style={{...styles.titleText, color: theme=="light" ? COLORS.blackText : COLORS.white}}>Reservation</CustomText>
      </View>
      <View style={styles.progressBarHolder}>
        <ProgressBar activeNumber={stageNumber} style={styles.progressBar} />
      </View>
      <View style={styles.main}>
          <ReservationContent
            stageNumber={stageNumber}
            reserveFormValues={reserveFormValues}
            userFormValues={userFormValues}
            cardFormValues={cardFormValues}
            completePreviewValues={completedValues}
            handleReserveFieldChange={handleReserveFieldChange}
            handleUserFieldChange={handleUserFieldChange}
            handleCardFieldChange={handleCardFieldChange}
            setIsKeyboardAvoidEnabled={setIsKeyboardAvoidEnabled}
          />
      </View>
      <CustomButton
        title={buttonTitle}
        style={styles.button}
        onPress={handleButtonPress}
      />
    </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height:  Dimensions.get('window').height,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: Dimensions.get('window').height*0.07,
    paddingBottom: Dimensions.get('window').height*0.02,
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
    width: "100%",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: Dimensions.get('window').height*0.02,
    width: "90%",
    fontSize: 24,
  },
  progressBarHolder: {
    alignItems: "center",
    marginBottom: 5,

  },
  progressBar: {
    marginBottom: 5,
  },
});
