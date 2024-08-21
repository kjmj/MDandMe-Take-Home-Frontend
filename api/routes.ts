import { Platform } from "react-native";

// Android doesn't use localhost properly - this is a workaround
export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost' + ":3000/posts";
