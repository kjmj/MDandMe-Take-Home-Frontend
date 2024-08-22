// CustomHeader.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { FontAwesome } from "@expo/vector-icons";

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="gray" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomHeader;
