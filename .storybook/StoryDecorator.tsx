import React from "react";
import { View } from "react-native";

/**
 * StoryDecorator
 * Component Wrapper for All Stories
 */
export const StoryDecorator = (story: () => React.ReactNode) => {
  return <View style={{ flex: 1 }}>{story()}</View>;
};
