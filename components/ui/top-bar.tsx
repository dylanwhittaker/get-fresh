import { Image } from "expo-image";
import { FC } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TopBar: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: insets.top,
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
        source={require("@/assets/images/get-fresh-logo-transparent.svg")}
      />
    </View>
  );
};
