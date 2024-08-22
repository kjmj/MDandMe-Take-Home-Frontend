import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import store from "@/store/store";
import CustomHeader from "@/components/CustomHeader";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader title="Community" />,
            }}
          />
          <Stack.Screen
            name="PostDetailView"
            options={{
              header: () => <CustomHeader showBackButton={true} />,
            }}
          />
        </Stack>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
