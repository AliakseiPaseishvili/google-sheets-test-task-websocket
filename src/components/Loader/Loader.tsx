import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { RStyleSheet } from "../Stylesheet";

export const Loader = () => {
  return (
    <View style={[styles.wrapper, { width: Dimensions.get('window').width }]}>
      <ActivityIndicator />
    </View>
  );
};

const styles = RStyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
});
