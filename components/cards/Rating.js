import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {CustomText} from '../CustomText';
import COLORS from '../../styles/colors';
import { CustomSvg } from './CustomSvg.js';



export const Rating = ({value, style, starColor}) => {
    const bgc = (style && style.backgroundColor) ? style.backgroundColor : null;
    const txtColor = (style && style.color) ? style.color : "#FFFFFF"; 
    return (
        <View style={[styles.container, style]}>
            <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={[bgc || COLORS.gradientOrange, bgc || COLORS.gradientPink]}
            style={styles.gradient}>
                <CustomText style={[styles.value, {color: txtColor}]}>{value || "~"}</CustomText>
                <CustomSvg style={{...styles.star, color: starColor }} name={"star"} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    gradient: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 23,
        borderRadius: 40,
    },
    value: {
        fontSize: 12,
        fontWeight: "800",
        fontFamily: "NunitoBold",
    },
    star: {
        marginLeft: 4,
        width: 12,
        height: 12,
    }
})