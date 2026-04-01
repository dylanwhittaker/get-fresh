// import useCartStore from "@/stores/cart/cart-store";
import { Image } from "expo-image";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { CartNavigatorButton } from "./buttons/cart-navigator-button";

export const TopBar: FC = () => {
  const insets = useSafeAreaInsets();
  // const totalSelectedQuantity = useCartStore((s) =>
  //   Object.values(s.cartItems).reduce((sum, item) => sum + item.quantity, 0)
  // );

  return (
    <View style={[{ marginTop: insets.top }, styles.container]}>
      <Image
        style={styles.image}
        source={require("@/assets/images/GET-FRESH-logo-transparent.svg")}
      />
      {/* <CartNavigatorButton totalSelectedQuantity={totalSelectedQuantity} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#fff"
  },
  image: {
    height: 40,
    width: 80,
    margin: 7
  }
});
