import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Toaster } from "sonner-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)"
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "" }}
          />
        </Stack>
        <StatusBar style="auto" />
        <View
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "#fff",
            width: "100%",
            height: insets.top
          }}
        ></View>
        <Toaster />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
