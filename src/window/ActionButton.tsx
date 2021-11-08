import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

type ActionButtonProps = {
  color: string;
  onPress: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({onPress, color}) => {
  return (
    <Pressable onPress={onPress} style={{paddingHorizontal: 5}}>
      <View style={[styles.button, {backgroundColor: color}]} />
    </Pressable>
  );
};

export default ActionButton;

const SIZE = 15;
const styles = StyleSheet.create({
  button: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});
