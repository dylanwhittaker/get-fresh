import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import { IconSymbol } from "./icon-symbol";

type CartButtonProps = {
  totalSelectedQuantity: number;
  iconColour?: string;
};

export const CartIcon: FC<CartButtonProps> = ({
  totalSelectedQuantity,
  iconColour
}) => {
  return (
    <View style={[styles.container]}>
      <IconSymbol
        color={iconColour ?? styles.icon.color}
        name="cart.fill"
        style={[styles.icon, { color: iconColour ?? styles.icon.color }]}
      />
      {!!totalSelectedQuantity && <Badge>{totalSelectedQuantity}</Badge>}
    </View>
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
