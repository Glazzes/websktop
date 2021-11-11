import React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";

type VirtualDesktopProps = {
  index: number;
};

const VirtualDesktop: React.FC<VirtualDesktopProps> = ({index}) => {
  return (
    <View style={styles.desktop}>
      <Text>Hello world {index}</Text>
    </View>
  );
};

export default VirtualDesktop;

const styles = StyleSheet.create({
  desktop: {
    width: "100%",
    height: "100%",
  },
});
