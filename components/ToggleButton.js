import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ToggleButton = ({value, setValue, reset }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [toggle, setToggle] = useState(value);

  const toggleBtn = () => {
    Animated.timing(animation, {
      toValue: toggle ? 36 : 0,
      duration: 600,
    }).start(setToggle((v) => !v));
    setValue(toggle);
  };

  useEffect(() => {
    toggleBtn();
  }, [reset]);

  return (
    <Animated.View style={styles.toggleBtn}>
      <LinearGradient
        colors={toggle ? ["#DFDEDE", "#DFDEDE"] : ["#FF6161", "#FF61DC"]}
        style={styles.toggleLinear}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 0.4, 1]}
      >
        <Animated.View
          style={{
            marginLeft: animation,
          }}
        >
          <TouchableOpacity
            style={styles.toggleBtnElement}
            onPress={toggleBtn}
          ></TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toggleBtn: {
    marginTop: 10,
    width: 70,
    height: 34,
    borderRadius: 37,
  },
  toggleBtnElement: {
    width: 26,
    height: 26.5,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  toggleLinear: {
    flex: 1,
    borderRadius: 37,
    justifyContent: "center",
    paddingLeft: 4,
  },
});
