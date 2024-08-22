import { Platform } from "react-native";

export function API_URL(): string {
  return (
    (Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost") +
    ":3000/posts"
  );
}
