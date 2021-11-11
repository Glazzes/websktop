import React, {useEffect, useRef, useState} from "react";
import {ImageBackground, StyleSheet, View, NativeMethods} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import TaskBar from "./TaskBar";
import VirtualDesktop from "./VirtualDesktop";
import {eventEmitter} from "../utils/event-emitter";

const BIGSUR = require("../assets/big-sur.jpg");
const AnimatedBackgroundImage = Animated.createAnimatedComponent(ImageBackground);

const Desktop = () => {
  const [index, setIndex] = useState<number>(0);
  const aRef = useRef<typeof AnimatedBackgroundImage>();
  const translateX = useSharedValue<number>(0);

  const switchVirtualDesktop = (index: number) => {
    aRef.current.measure((x, y, width) => {
      translateX.value = withTiming(index * width);
    });
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -translateX.value}],
      flexDirection: "row",
      width: "100%",
    };
  });

  useEffect(() => {
    eventEmitter.addListener("switch", (index: number) => switchVirtualDesktop(index));

    return () => {
      eventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <AnimatedBackgroundImage ref={aRef} style={[styles.root]} source={BIGSUR} resizeMode={"cover"}>
      <TaskBar />
      <View style={styles.virtualContainer}>
        <Animated.View style={rStyle}>
          {new Array(3).fill(0).map((_, index) => {
            return <VirtualDesktop index={index} key={`desktop-${index}`} />;
          })}
        </Animated.View>
      </View>
    </AnimatedBackgroundImage>
  );
};

export default Desktop;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  virtualContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
});
