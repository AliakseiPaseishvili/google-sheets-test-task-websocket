import React from "react";
import { View } from "react-native";
import { RStyleSheet } from "../Stylesheet";

export const Placeholder = () => {
  return <View style={styles.wrapper} />;
};

const styles = RStyleSheet.create({
  wrapper: { height: 40 },
});
