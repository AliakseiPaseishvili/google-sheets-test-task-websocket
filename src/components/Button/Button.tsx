import React, { FC } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps, TextStyle } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  textStyle?: TextStyle;
}

export const Button: FC<ButtonProps> = ({ text, textStyle, children, onPress, ...props }) => {
  return (
    <TouchableOpacity {...props} onPress={onPress} disabled={!onPress}>
      {text ? <Text style={textStyle}>{text}</Text> : children}
    </TouchableOpacity>
  );
};
