import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type FontAwesomeIconName = "heart" | "comment" | "bookmark"; // Add more icons as needed

interface IconButtonProps {
  iconName: FontAwesomeIconName;
  count?: number;
  onPress: () => void;
  animate?: boolean;
  filledColor?: string; // Color when the icon is filled
  showCount?: boolean; // Whether to show count or not
  noStateChange?: boolean; // Whether the icon should not change state/color when pressed
  stayPressed?: boolean; // Whether the button should stay pressed once activated
}

export default function IconButton({
  iconName,
  count,
  onPress,
  animate = false,
  filledColor = "pink", // Default filled color
  showCount = true,
  noStateChange = false, // Default to false
  stayPressed = false, // Default to false
}: IconButtonProps) {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current; // Ref to persist animation value

  function handlePress() {
    if (!noStateChange) {
      setPressed(!pressed);
    }
    if (animate) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    onPress();
  }

  // Apply animation to transform style
  const transformStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const iconStyle = {
    color: !noStateChange && pressed ? filledColor : "black",
  };

  // Uses an outlined icon if not pressed, otherwise a normal icon
  const iconNameFinal = (): FontAwesomeIconName => {
    return pressed
      ? (iconName as FontAwesomeIconName)
      : (`${iconName}-o` as FontAwesomeIconName);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={styles.iconContainer}>
        <Animated.View style={transformStyle}>
          <FontAwesome name={iconNameFinal()} size={20} style={iconStyle} />
        </Animated.View>
      </View>
      {showCount && count !== undefined && (
        <Text style={styles.text}>{count}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
});
