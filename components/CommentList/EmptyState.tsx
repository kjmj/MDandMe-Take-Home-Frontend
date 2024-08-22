import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/conversation.png")}
        style={styles.image}
      />
      <Text style={styles.message}>
        No comments yet. Be the first to comment!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "gray",
    textAlign: "center", // Center-align text
  },
});

export default EmptyState;
