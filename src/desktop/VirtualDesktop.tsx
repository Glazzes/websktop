import React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";

const {width} = Dimensions.get("window");

const VirtualDesktop = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default VirtualDesktop;

const styles = StyleSheet.create({
  desktop: {
    width,
    flex: 1,
  },
});
