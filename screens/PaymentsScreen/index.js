import React from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, FlatList, Dimensions} from 'react-native';
import { CustomText, CustomSvg } from '../../components';
import COLORS from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { PaymentItem } from './PaymentItem';

const screenWidth = Dimensions.get('window').width;

export const PaymentsScreen = () => {

    const DATA = [
        {
            hotelName: "Fairmont Baku",
            roomName: "Double Room",
            price: 2000,
            currency: "AZN",
            date: "04/05/20",
            imgUrl: "https://r-cf.bstatic.com/images/hotel/max1024x768/140/140205644.jpg",
            
        },
        {
            hotelName: "Radisson",
            roomName: "Twin room",
            price: 3000,
            currency: "$",
            date: "04/05/20",
            imgUrl: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            
        },
    ]; 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleHolder}>
                    <TouchableNativeFeedback
                        // onPress={() => navigation.navigate(route.params.backScreen)}
                    >
                        <View style={styles.backBtn}>
                            <CustomSvg name={"chevronLeft"} style={styles.chevronLeft}/>
                        </View>
                    </TouchableNativeFeedback>
                  <CustomText style={styles.titleText}>Payments</CustomText>
                </View>
                <LinearGradient style={styles.gradientHeader}
                colors={[COLORS.gradientOrange, COLORS.gradientPink]}
                start={[0, 0]}
                end={[1, 0]}
                >
                </LinearGradient> 
            </View>
            <View style={styles.main}>
                <FlatList
                style={styles.paymentList}
                data={DATA}
                renderItem={({ item, index }) => <PaymentItem key={index} paymentInfo={item}/>}
                ListFooterComponent={ <View style={{ margin: 20, }} /> }
                />
            </View>
        </View>
    )
}

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
        left: -(1000-screenWidth)/2,
        width: 1000,
        height: 1000,
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        elevation: 5,
        zIndex: -1
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
})