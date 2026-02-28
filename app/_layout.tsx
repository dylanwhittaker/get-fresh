import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Pressable, StyleSheet, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Image } from "expo-image";
import { Badge } from "react-native-paper";

export const unstable_settings = {
  anchor: "(tabs)"
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
      <View
        style={{
          position: "absolute",
          top: insets.top,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: 60,
          backgroundColor: "#fff"
        }}
      >
        <Image
          style={{
            height: 40,
            width: 80,
            margin: 7
          }}
          source={require("@/assets/images/GET-FRESH-logo-transparent.svg")}
        />
        <Pressable
          android_ripple={{
            color: "rgba(202, 202, 202, 0.5)",
            foreground: true,
            borderless: true,
            radius: 30
          }}
          onPress={() => {}}
          style={({ pressed }) => [
            styles.iconContainer,
            pressed && styles.pressed
          ]}
        >
          <Badge>3</Badge>
          <IconSymbol
            size={310}
            color="#808080"
            name="cart.fill"
            style={styles.cartIcon}
          />
        </Pressable>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    // backgroundColor: "#9e9e9e",
    margin: 5,
    borderRadius: 30
  },
  pressed: {
    opacity: 0.7
    // backgroundColor: "red"
  },
  cartIcon: {
    color: "#808080",
    height: 30, // height & width - size SF symbols
    width: 30,
    left: 10,
    top: 10,
    fontSize: 30, // sizes material
    position: "absolute",
    borderRadius: 5
  }
});
