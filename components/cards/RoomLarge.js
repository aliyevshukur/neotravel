import React from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../../styles/colors';
import { CustomText } from '../CustomText';
import { CustomSvg } from './CustomSvg';

export const RoomLarge = ({cardInfo, onSelectPress, onInfoPress}) => {
    const item = cardInfo || {};
    const makeItShort = (value, length, end = " ...") => {
        return value ? (value = value.toString(), value.length <= length ? value : value.substring(0, length) + end) : null;
    }

    // const details = [
    //     {
    //         id: 1,
    //         title: "Refundable",
    //         icon: "coins",
    //     },
    //     {
    //         id: 2,
    //         title: "Breakfast included",
    //         icon: "coffee",
    //     },
    //     {
    //         id: 3,
    //         title: "Wi-Fi",
    //         icon: "wifi",
    //     },
    //     {
    //         id: 4,
    //         title: "Air Conditioner",
    //         icon: "thermometer",
    //     },
    //     {
    //         id: 5,
    //         title: "Bath",
    //         icon: "bath",
    //     },
        
    // ]
    

    return (
        <View style={styles.container}>
            <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.7)"]}
            style={styles.gradient}
            >
                <Image resizeMode={'cover'} style={styles.bgImg} source={{uri: item.imgUrl}}/>
            </LinearGradient>
            <View style={styles.cardInfo}>
                <CustomText style={styles.name}>{makeItShort(item.name, 40) || "~"}</CustomText>
                <View style={styles.details}>
                    <FlatList
                    data={item.details}
                    renderItem={({ item }) =>  <View style={styles.detailItem}> 
                                                    <CustomSvg name={item.icon} style={styles.svg}/>
                                                    <CustomText style={styles.detailText}>{item.title}</CustomText>
                                                </View>}
                    keyExtractor={item => item.id}
            
                    />
                    
                </View>
            </View>
            <CustomText style={styles.price}>{item.currency || "$"} {makeItShort(item.price, 7, "...") || "~"}</CustomText>
            <CustomText style={styles.nights}>{makeItShort(item.time, 3) || "~"} nights</CustomText>
            <View style={styles.selectHolder}>
                {/* button will be here */}
                <CustomText>SELECT</CustomText> 
            </View>
            <View style={styles.infoHolder}>
                {/* info button will be here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // width: 338,
        backgroundColor: "transparent",
        borderRadius: 10,
        overflow: "hidden",
    },
    gradient: {
        width: "100%",
        height: 185,
        zIndex: -1,
        backgroundColor: COLORS.imgLoad,
    },
    bgImg: {
        width: "100%",
        height: "100%",
        zIndex: -1,
    },
    cardInfo: {
        backgroundColor: "white",
        height: 301,
    },
    name: {
        position: "absolute",
        left: 20,
        right: 35,
        top: 15,
        fontFamily: "NunitoBold",
        fontSize: 22,
        fontStyle: "normal",
        lineHeight: 30,
        color: COLORS.blackText,
    },
    details: {
        position: "absolute",
        left: 20,
        top: 73,
        width: 209.25,
        height: 130,
        // backgroundColor: "red",
    },
    detailItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    svg: {
        width: 20,
        height: 20,
        color: COLORS.grayLight,
    },
    detailText: {
        color: COLORS.grayDark,
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        marginLeft: 15,
    },
    price: {
        position: "absolute",
        left: 20,
        bottom: 45,
        fontFamily: "NunitoBold",
        fontWeight: "800",
        fontSize: 24,
        fontStyle: "normal",
        color: COLORS.darkPriceInCards,
    },
    nights: {
        position: "absolute",
        left: 20,
        bottom: 25,
        color: COLORS.gray,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
    },
    selectHolder: {
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 185,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "tomato",//will be deleted
    },
    infoHolder: {
        position: "absolute",
        right: 15,
        bottom: 260,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "tomato",//will be deleted
    }
})