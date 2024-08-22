import { Platform } from "react-native";
import { API_URL } from "@/store/storeUtils";

describe("API_URL", () => {
  it("should return the correct URL for Android", () => {
    // Mock the Platform.OS to be 'android'
    Platform.OS = "android";

    const url = API_URL();
    expect(url).toBe("http://10.0.2.2:3000/posts");
  });

  it("should return the correct URL for iOS", () => {
    // Mock the Platform.OS to be 'ios'
    Platform.OS = "ios";

    const url = API_URL();
    expect(url).toBe("http://localhost:3000/posts");
  });

  it("should return the correct URL for Web", () => {
    // Mock the Platform.OS to be 'web'
    Platform.OS = "web";

    const url = API_URL();
    expect(url).toBe("http://localhost:3000/posts");
  });

  it("should return the correct URL for any other platform", () => {
    // Mock the Platform.OS to be any other platform, e.g., 'windows'
    Platform.OS = "windows";

    const url = API_URL();
    expect(url).toBe("http://localhost:3000/posts");
  });
});
