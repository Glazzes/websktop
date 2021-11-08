import React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ActionButton from "./ActionButton";
import ExpanderPoint from "./ExpanderPoint";

const colors = ["#FCBE07", "#13CA39", "#F25056"];

const {height, width} = Dimensions.get("window");

type WindowProps = {
  title: string;
};

const Window: React.FC<WindowProps> = ({title, children}) => {
  const rHeight = useSharedValue<number>(height * 0.45);
  const rWidth = useSharedValue<number>(width * 0.45);
  const opacity = useSharedValue<1 | 0>(1);
  const scale = useSharedValue<1 | 0>(1);
  const borderRadius = useSharedValue<number>(10);
  const tx = useSharedValue<number>(0);
  const ty = useSharedValue<number>(0);

  const expandWindow = (): void => {
    tx.value = withTiming(0);
    ty.value = withTiming(0);
    rHeight.value = withTiming(height);
    rWidth.value = withTiming(width);
    borderRadius.value = withTiming(0);
  };

  const shrinkWindow = () => {
    rHeight.value = withTiming(height * 0.45);
    rWidth.value = withTiming(width * 0.45);
    borderRadius.value = withTiming(10);
  };

  const minizeWindow = () => {
    opacity.value = 1;
    scale.value = 0;
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.y = ty.value;
      ctx.x = tx.value;
      //ctx.x = rWidth.value;
      //ctx.y = rHeight.value;
    },
    onActive: (e, ctx) => {
      ty.value = e.translationY + ctx.y;
      tx.value = e.translationX + ctx.x;
      //rHeight.value = ctx.y + e.translationY;
      //rHeight.value = ctx.y + e.translationY * 2;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      width: rWidth.value,
      height: rHeight.value,
      transform: [{translateX: tx.value}, {translateY: ty.value}, {scale: scale.value}],
      opacity: opacity.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <Animated.View style={[styles.browser, rStyle]}>
      <View style={{flex: 1}}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View>
            <div onDoubleClick={shrinkWindow}>
              <View style={styles.windowTitleBar}>
                <View style={styles.placeHolder} />
                <Text style={styles.windowTitle}>{title}</Text>
                <View style={styles.windowButtonSection}>
                  <ActionButton color={colors[0]} onPress={minizeWindow} />
                  <ActionButton color={colors[1]} onPress={expandWindow} />
                  <ActionButton color={colors[2]} onPress={() => {}} />
                </View>
              </View>
            </div>
          </Animated.View>
        </PanGestureHandler>
        {children}
      </View>
    </Animated.View>
  );
};

export default Window;

const styles = StyleSheet.create({
  browser: {
    padding: 5,
    backgroundColor: "#202124",
    position: "relative",
    borderRadius: 10,
  },
  windowTitleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  placeHolder: {
    width: width * 0.05,
  },
  windowTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  windowButtonSection: {
    flexDirection: "row",
  },
});
