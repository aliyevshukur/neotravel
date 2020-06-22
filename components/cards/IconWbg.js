import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import COLORS from '../../styles/colors';
import { CustomSvg } from './CustomSvg';

export const IconWbg = ({style, iconName, theme}) => {

    return (
      <TouchableOpacity style={styles.touchable}>
        <View style={[styles.container, style, {backgroundColor: theme=="dark" ? COLORS.bgcDark : COLORS.bgcLight}]}>
          <CustomSvg style={styles.icon} name={iconName} gradient={true}/>
        </View>
      </TouchableOpacity>
        
        
    );
}

const styles = StyleSheet.create({
  touchable: {

  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    height: 380,
    borderRadius: 50,
  },
  icon: {
    width: 150,
  }
    
});