import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import { CustomSvg, CustomText, RoomLarge } from '../../components';
import COLORS from '../../styles/colors';


export const RoomScreen = () => {


    const DATA = [
        {
            id: "4399593499594004392995",
            name: "Standard King room",
            imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            price: "200",
            currency: "EU",
            time: "3",
            features: ["coffee", "coins"],
        },
        {
            id: "13454545534",
            name: "Standard King room",
            imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            price: "200",
            currency: "EU",
            time: "3",
            features: ["bath", "thermometer", "wifi", "coffee", "coins"],
            extraInfo: "Bu orta babat bir otaqdi. Guman ki xoshunuza gelecek",
        },
        {
            id: "845838828382885848584",
            name: "Standard King room",
            imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
            price: "200",
            currency: "EU",
            time: "3",
            features: ["bath", "thermometer", "wifi", "coffee"],
            extraInfo: "Bu mohtehsem bir otaqdi. Shibhesiz sizin xoshunuza gelecek bundan hech narahat olamayin",
        }
    ]

    const goBackHandler = () => {
        console.log("GO BACK");
        
    }

    const infoHandler = (id) => {
        const index = DATA.findIndex((item) => item.id == id);

        Alert.alert(
            `${DATA[index].name}`,
            `${DATA[index].extraInfo}`,
            [
              { text: 'OK', }
            ],
            { cancelable: true }
          );
    }
    const selectHandler = (id) => {
        const index = DATA.findIndex((item) => item.id == id);
        console.log(`${index}`);
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
                    <CustomSvg name={'chevronLeft'} style={styles.chevronLeft}/>
                </TouchableOpacity>
                <CustomText style={styles.titleText}>Mountain Resort</CustomText>
            </View>
            <View style={styles.main}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <RoomLarge style={styles.roomItem}
                        cardInfo={item}
                        onInfoPress={() => infoHandler(item.id)}
                        onSelectPress={() => selectHandler(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id}
                /> 
            </View>
        </View>
    )
}

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
        paddingBottom: 25,
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
        marginHorizontal: 20,
        paddingBottom: 100,
    },
    roomItem: {
        marginBottom: 20,
    }
});