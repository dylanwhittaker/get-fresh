import { FC, memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "../icon-symbol";

type QtyButtonProps = {
  variant: "product" | "cart";
  icon: "plus" | "minus";
  onPress: () => void;
  size?: "s" | "m";
  disabled?: boolean;
};

export const QtyButton: FC<QtyButtonProps> = memo(
  ({ variant = "product", icon = "plus", onPress, size = "m", disabled }) => {
    return (
      <Pressable
        android_ripple={{
          color: variant === "product" ? "#8bb75c80" : "#8bb75c29",
          foreground: true,
          radius: 22
        }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles[`pressable_${variant}`],
          styles[`pressable_${size}`],
          disabled && variant === "product" && styles.disabledPressable_product,
          pressed && styles.pressed
        ]}
      >
        <IconSymbol
          color={
            disabled && variant === "cart"
              ? styles.disabledPressable_cart.color
              : styles[`icon_${variant}`]?.color
          }
          name={icon}
          style={[
            styles[`icon_${variant}`],
            styles[`icon_${size}`],
            disabled && variant === "cart" && styles.disabledPressable_cart
          ]}
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  pressable_product: {
    backgroundColor: "#268341"
  },
  pressable_cart: {
    backgroundColor: "#ffffff",
    borderColor: "#cbcbcb",
    borderWidth: 1
  },
  pressable_m: {
    height: 50,
    width: 50,
    borderRadius: 15
  },
  pressable_s: {
    height: 40,
    width: 40,
    borderRadius: 15
  },
  disabledPressable_product: {
    backgroundColor: "#8c8c8c"
  },
  disabledPressable_cart: {
    color: "#8c8c8c"
  },
  pressed: {
    opacity: 0.7
  },
  icon_product: {
    color: "#ffffff",
    position: "absolute",
    borderRadius: 5
  },
  icon_cart: {
    color: "#268341",
    position: "absolute",
    borderRadius: 5
  },
  icon_m: {
    height: 30, // height & width - size SF symbols
    width: 30,
    left: 10,
    top: 10,
    fontSize: 30 // sizes material
  },
  icon_s: {
    height: 20,
    width: 20,
    left: 9,
    top: 9,
    fontSize: 20
  }
});
