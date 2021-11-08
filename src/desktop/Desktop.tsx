import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import Window from "../window/Window";

const BIGSUR = require("../assets/big-sur.jpg");

const Desktop = () => {
  return (
    <ImageBackground source={BIGSUR} style={styles.root} resizeMode={"cover"}>
      <Window title="Firefox">
        <iframe
          src={"https://www.google.com/webhp?igu=1"}
          style={{flexGrow: 1, flexShrink: 1, overflow: "hidden", borderRadius: 10}}
          frameBorder={0}
        />
      </Window>
    </ImageBackground>
  );
};

export default Desktop;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
