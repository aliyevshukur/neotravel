import React, { useState } from 'react';
import {View, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, FlatList} from 'react-native';
import COLORS from '../../styles/colors';
import { CustomText, CustomSvg } from '../../components';
// import { TouchableHighlight } from 'react-native-gesture-handler';

export const SelectAlert = ({selectInfo, selectResult, closeModal}) => {
    const [selected, setSelected] = useState("");
    const selectHandler = (s) => {
        setSelected(s);
    }
    const setHandler = () => {
        closeModal();
        selectResult(selected);
    }
    return (
        <View style={styles.alertContainer}>
            <View style={styles.alertView}>
                <CustomText style={styles.alertTitle}>{selectInfo.title}</CustomText>
                <TouchableOpacity style={styles.crossTouch} onPress={closeModal}>
                    <CustomSvg name={'times'} style={styles.crossSvg}/>
                </TouchableOpacity>

                <View style={styles.alertMain}>
                    <View style={styles.scrollHolder}>
                        <FlatList
                            data={selectInfo?.selectables}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectHandler(item)} style={{alignItems: "center",}}>
                                    <CustomText style={[styles.selectText, 
                                    {color: selected==item ? COLORS.blackText : COLORS.gray,
                                        fontWeight: selected==item ? "bold" : "normal",
                                    }]}
                                    >{item}</CustomText>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item}
                        />
                    </View>
                    {/* <View style={styles.resultHolder}>
                        <TextInput style={styles.input} value={`${selected}`}/>
                    </View> */}
                </View>
                <TouchableOpacity style={styles.goHolder} onPress={setHandler}>
                    <CustomText style={styles.goText}>Set</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alertContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: 2,
    },
    alertView: {
        alignItems: "center",
        width: "80%",
        backgroundColor: "white",
        height: "30%",
        borderRadius: 10,
        overflow: "hidden",
    },
    alertTitle: {
        color: COLORS.blackText,
        fontFamily: "NunitoSemiBold",
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    crossTouch: {
        position: "absolute",
        right: 12,
        top: 12,
        width: 20,
        height: 20,
    },
    crossSvg: {
        color: COLORS.grayDark,
        width: "100%",
        height: "100%",
    },

    alertMain: {
        width: "80%",
        height: "70%",
        flexDirection: "row",
        justifyContent: "center",
    },
    scrollHolder: {
        width: "100%",
        alignItems: "center",
    },
    selectText: {
        color: COLORS.gray,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    resultHolder: {
        width: "50%",
    },
    input: {
        marginTop: 10,
        fontSize: 15,
        fontFamily: "NunitoRegular",
        backgroundColor: COLORS.offWhite,
        paddingVertical: 3,
        paddingHorizontal: 10,
        color: COLORS.blackText,
        fontStyle: "normal",
        width: "100%",
        borderRadius: 15,
    },
    goHolder: {
        position: "absolute",
        bottom: 10,
        right: 20,
    },
    goText: {
        fontSize: 25,
        fontFamily: "NunitoBold",
    },
})