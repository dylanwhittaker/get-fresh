import { router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { IconSymbol } from "../icons/icon-symbol";

type CartNavigatorButtonProps = {
  totalSelectedQuantity: number;
};

export const CartNavigatorButton: FC<CartNavigatorButtonProps> = ({
  totalSelectedQuantity
}) => {
  return (
    <Pressable
      android_ripple={{
        color: "rgba(202, 202, 202, 0.5)",
        foreground: true,
        borderless: true,
        radius: 30
      }}
      onPress={() => router.push("/cart")}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {!!totalSelectedQuantity && <Badge>{totalSelectedQuantity}</Badge>}
      <IconSymbol
        size={310}
        color={styles.icon.color}
        name="cart.fill"
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 30
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
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
