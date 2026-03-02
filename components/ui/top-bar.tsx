import useCartStore from "@/stores/cart/cart-store";
import { Image } from "expo-image";
import { FC, useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartNavigatorButton } from "./buttons/cart-navigator-button";

export const TopBar: FC = () => {
  const insets = useSafeAreaInsets();
  const quantities = useCartStore((state) => state.quantities || 0);

  const totalSelectedQuantity = useMemo(() => {
    let total = 0;
    Object.keys(quantities).forEach((key) => {
      total += quantities[key]?.quantity || 0;
    });
    return total;
  }, [quantities]);

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
      <CartNavigatorButton totalSelectedQuantity={totalSelectedQuantity} />
    </View>
  );
};
