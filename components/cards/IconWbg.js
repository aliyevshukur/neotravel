import React from 'react';
import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import COLORS from '../../styles/colors';
import { CustomSvg } from './CustomSvg';

export const IconWbg = ({style, iconName="location", theme="light", onPress}) => {

    return (
      <TouchableNativeFeedback style={styles.touchable} onPress={onPress}>
        <View style={[styles.container, style, {backgroundColor: theme=="dark" ? COLORS.bgcDark : COLORS.bgcLight}]}>
          <View style={styles.svgHolder}>
            <CustomSvg style={styles.icon} name={iconName} gradient={true}/>
          </View>
        </View>
      </TouchableNativeFeedback>
        
        
    );
}

const styles = StyleSheet.create({
  touchable: {
    
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    borderRadius: 5,
    elevation: 5,
  },
  svgHolder: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 21,
  },
  icon: {
    width: "100%",
    height: "100%",
  }
    
});
