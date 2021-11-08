import React from "react";
import {StyleSheet} from "react-native";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {useAnimatedGestureHandler} from "react-native-reanimated";

type ExpanderPointProps = {
  inverted: boolean;
  width: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
};

const ExpanderPoint: React.FC<ExpanderPointProps> = ({inverted, height, width}) => {
  const multiplier = inverted ? -1 : 1;

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {height: number; width: number}
  >({
    onStart: (_, ctx) => {
      ctx.height = height.value;
      ctx.width = width.value;
    },
    onActive: (e, ctx) => {
      height.value = multiplier * e.translationY + ctx.height;
      width.value = multiplier * e.translationX + ctx.width;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.point} />
    </PanGestureHandler>
  );
};

export default ExpanderPoint;

const styles = StyleSheet.create({
  point: {
    backgroundColor: "pink",
    height: 20,
    width: 20,
  },
});
