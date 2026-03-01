import { IconSymbol } from "@/components/ui/icon-symbol";
import useCartStore from "@/stores/cart/cart-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TopBar: FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
      <Pressable
        android_ripple={{
          color: "rgba(202, 202, 202, 0.5)",
          foreground: true,
          borderless: true,
          radius: 30
        }}
        onPress={() => router.push("/cart")}
        style={({ pressed }) => [
          styles.iconContainer,
          pressed && styles.pressed
        ]}
      >
        {!!totalSelectedQuantity && <Badge>{totalSelectedQuantity}</Badge>}
        <IconSymbol
          size={310}
          color="#808080"
          name="cart.fill"
          style={styles.cartIcon}
        />
      </Pressable>
    </View>
  );
};

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
