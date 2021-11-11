import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";
import {eventEmitter} from "../utils/event-emitter";

type VirtualizedDesktopSelectorProps = {
  index: number;
  currentIndex: number;
  setIndex: (index: number) => void;
};

const VirtualizedDesktopSelector: React.FC<VirtualizedDesktopSelectorProps> = ({
  index,
  currentIndex,
  setIndex,
}) => {
  const style = {backgroundColor: currentIndex == index ? "pink" : "transparent"};

  const switchToDesktop = () => {
    setIndex(index);
    eventEmitter.emit("switch", index);
  };

  return (
    <Pressable style={[styles.selector, style]} onPress={switchToDesktop}>
      <Text style={styles.identifier}>{index}</Text>
    </Pressable>
  );
};

export default VirtualizedDesktopSelector;

const SIZE = 25;
const styles = StyleSheet.create({
  selector: {
    height: SIZE,
    width: SIZE * 1.3,
    justifyContent: "center",
    alignItems: "center",
  },
  identifier: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
