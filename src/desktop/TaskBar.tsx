import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import VirtualizedDesktopSelector from "./VirtualizedDesktopSelector";
import {eventEmitter} from "../utils/event-emitter";

const TaskBar = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [desktops, setDesktops] = useState<number[]>([0, 0]);

  const addNewDesktop = () => {
    setDesktops((prev) => {
      if (prev.length < 6) {
        return [...prev, 0];
      }

      return prev;
    });
  };

  return (
    <View style={styles.taskbar}>
      <View style={styles.selectorBox}>
        {desktops.map((_, index) => {
          return (
            <VirtualizedDesktopSelector
              index={index}
              currentIndex={currentIndex}
              setIndex={setCurrentIndex}
              key={`selector-${index}`}
            />
          );
        })}
        <Pressable onPress={addNewDesktop}>
          <MaterialCommunityIcons name="plus" size={20} color={"white"} />
        </Pressable>
      </View>
    </View>
  );
};

export default TaskBar;

const styles = StyleSheet.create({
  taskbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: "rgba(0,0,0, 0.3)",
  },
  selectorBox: {
    flexDirection: "row",
  },
});
