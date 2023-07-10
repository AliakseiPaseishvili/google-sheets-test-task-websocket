import {
  Dimensions,
  TextStyle,
  ViewStyle,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from "react-native";
import { create } from "react-native-pixel-perfect";

export type StyleRules = StyleProp<ViewStyle | TextStyle | ImageStyle>;
type StyleRuleKey = keyof StyleRules;
type StyleRuleValue = StyleRules[StyleRuleKey];

type NamedStyles<T> = {
  [P in keyof T]: StyleRules;
};

export const SCREEN_DESIGN_DIMENSIONS = {
  width: 375,
  height: 812,
};

const HEIGHT_PROPORTION =
  Dimensions.get("screen").height / SCREEN_DESIGN_DIMENSIONS.height;
const WIDTH_PROPORTION =
  Dimensions.get("screen").width / SCREEN_DESIGN_DIMENSIONS.width;

/**
 * match pixel value to closest value of current device
 * width and height come from the figma design of the app
 */
export const px2dp = create(SCREEN_DESIGN_DIMENSIONS);
export const px2dpH = (value: number) => value * HEIGHT_PROPORTION;
export const px2dpW = (value: number) => value * WIDTH_PROPORTION;

const transformStyle = (
  key: keyof ViewStyle | keyof TextStyle,
  value: StyleRuleValue
) => {
  switch (key) {
    // these we don't want to transform
    case "flex":
    case "zIndex":
    case "flexGrow":
    case "flexBasis":
    case "flexShrink": {
      return value;
    }
    default: {
      return typeof value === "number" ? px2dp(value) : value;
    }
  }
};

export const transformRules = <S extends StyleRules>(styleRules: S) => {
  const result: StyleRules = {};
  const styleKeys = Object.keys(styleRules || {}) as StyleRuleKey[];

  return styleKeys.reduce((acc, key) => {
    const value = (styleRules || {})[key];

    return {
      ...acc,
      [key]: transformStyle(key, value),
    };
  }, result);
};

const createStyles = <S extends NamedStyles<S>>(styles: S): S => {
  const result = {} as S;
  const styleKeys = Object.keys(styles) as (keyof typeof styles)[];

  return StyleSheet.create(
    styleKeys.reduce((acc, key) => {
      const rules = styles[key];

      return {
        ...acc,
        [key]: transformRules(rules),
      };
    }, result)
  ) as S;
};

export const RStyleSheet = {
  ...StyleSheet,
  create: createStyles,
};
