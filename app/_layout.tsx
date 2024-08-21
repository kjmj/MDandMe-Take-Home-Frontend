import store from "@/store/store";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="PostDetailView" />
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