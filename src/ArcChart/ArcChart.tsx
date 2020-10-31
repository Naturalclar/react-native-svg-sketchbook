import React from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  multiply,
  Easing,
  Clock,
} from "react-native-reanimated";
import { Svg, Path } from "react-native-svg";
import { timing } from "react-native-redash";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  textContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  currentUnit: {
    fontSize: 40,
    fontWeight: "600",
  },
  goalUnit: {
    fontWeight: "600",
  },
  line: {
    height: 1,
    width: 80,
  },
});

const { PI, cos, sin } = Math;

type Props = {
  currentUnit: number;
  goalUnit: number;
};

export const ArcChart = ({ currentUnit, goalUnit }: Props) => {
  const getProgress = () => {
    if (goalUnit === 0) {
      return currentUnit > 0 ? 1 : 0;
    }
    if (currentUnit > goalUnit) {
      return 1;
    }
    return currentUnit / goalUnit;
  };

  const { width } = useWindowDimensions();

  const clock = new Clock();
  const config = {
    duration: 500,
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
  };

  const size = width - 32;
  const cx = size / 2;
  const cy = size / 2;

  const getPathFromRadius = (radius: number) => {
    const startX = cx - radius * cos(startAngle);
    const startY = -radius * sin(startAngle) + cy;
    const endX = cx - radius * cos(endAngle);
    const endY = -radius * sin(endAngle) + cy;
    // Arc の Svg Path
    return `M ${startX} ${startY} A ${radius} ${radius} 0 1 0 ${endX} ${endY}`;
  };

  const strokeWidth = 16;
  const ratio = 3;
  const radius = (size - strokeWidth) / ratio;
  const circumference = radius * 2 * PI;

  const arc = PI + PI * 0.4;
  const startAngle = PI;
  const endAngle = 2 * PI - PI * 0.2;
  // Arc の Svg Path

  // 受け取った percent に対しての最終到達地点
  const endProgress = (1 - getProgress()) * -arc;

  const alpha = interpolate(
    timing({ clock, duration: config.duration, easing: config.easing }),
    {
      inputRange: [0, 1],
      outputRange: [-arc, endProgress],
    }
  );
  const strokeDashoffset = multiply(alpha, radius);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Path
          stroke={"#e7f6f8"}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth}
          d={getPathFromRadius(radius)}
        />
        <AnimatedPath
          stroke={"red"}
          fill="none"
          d={getPathFromRadius(radius)}
          strokeDasharray={`${circumference} ${circumference}`}
          // @ts-ignore Animated Value が入るが、SVG の PathProps は Animated を想定していない
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={"#e7f6f8"}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth / 2}
          d={getPathFromRadius(radius * 0.88)}
        />
        <AnimatedPath
          stroke={"blue"}
          fill="none"
          d={getPathFromRadius(radius * 0.88)}
          strokeDasharray={`${circumference} ${circumference}`}
          // @ts-ignore Animated Value が入るが、SVG の PathProps は Animated を想定していない
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth / 2}
        />
        <Path
          stroke={"#e7f6f8"}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth / 2}
          d={getPathFromRadius(radius * 0.79)}
        />
        <AnimatedPath
          stroke={"#555"}
          fill="none"
          d={getPathFromRadius(radius * 0.79)}
          strokeDasharray={`${circumference} ${circumference}`}
          // @ts-ignore Animated Value が入るが、SVG の PathProps は Animated を想定していない
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth / 2}
        />
      </Svg>
    </View>
  );
};
