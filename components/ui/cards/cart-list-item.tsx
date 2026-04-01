import { GRAYS, PRIMARY_GREEN, TEXT } from "@/constants/theme";
import useCartStore from "@/stores/cart/cart-store";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/helpers/format-price";
import { Image } from "expo-image";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { QtyButton } from "../buttons/manage-quantity";

export type CartListItemProps = Product;

export const CartListItem: FC<CartListItemProps> = memo(
  ({ name, price, quantity_available, image }) => {
    const selectedQuantity = useCartStore(
      (state) => state.cartItems[name]?.quantity || 0
    );
    const setCartItem = useCartStore((state) => state.setCartItem);
    const removeItem = useCartStore((state) => state.removeItem);

    function incrementQuantity() {
      setCartItem({
        name,
        quantity: selectedQuantity + 1,
        price,
        quantity_available,
        image
      });
    }

    const canDecrement = selectedQuantity - 1 > 0;

    function decrementQuantity() {
      if (canDecrement) {
        setCartItem({
          name,
          quantity: selectedQuantity - 1,
          price,
          quantity_available,
          image
        });
      }
    }

    const formattedPrice = formatPrice(price * selectedQuantity);

    return (
      <View style={styles.mainContainer}>
        <IconButton
          icon="close"
          iconColor={PRIMARY_GREEN}
          size={18}
          onPress={() => removeItem(name)}
          style={styles.removeButton}
        />
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>

        <View style={styles.manageQContainer}>
          <Text style={styles.mainText}>{name}</Text>
          <Text style={[styles.subText]}>Available</Text>

          {/* Manage Quantities */}
          <View style={styles.quantityControlContainer}>
            <QtyButton
              variant="cart"
              icon="plus"
              size="s"
              onPress={incrementQuantity}
            />
            <View style={styles.quantityDisplay}>
              <Text style={styles.mainText}>{selectedQuantity}</Text>
            </View>
            <QtyButton
              variant="cart"
              icon="minus"
              size="s"
              disabled={!canDecrement}
              onPress={decrementQuantity}
            />
          </View>
        </View>

        {/* Remove & Price */}
        <View style={styles.pnqContainer}>
          <Text style={styles.price}>{formattedPrice}</Text>
        </View>
        <View style={styles.bottomBorder} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    position: "relative"
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1
  },
  bottomBorder: {
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
    alignSelf: "center",
    height: 1,
    backgroundColor: GRAYS.secondary
  },
  manageQContainer: {
    flex: 1
  },
  quantityControlContainer: {
    display: "flex",
    flexDirection: "row"
  },
  quantityDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    width: 100
  },
  image: {
    height: 60,
    width: 100
  },
  pnqContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600"
  },
  subText: {
    fontSize: 12,
    color: TEXT.secondary,
    marginBottom: 10
  },
  price: {
    fontSize: 18,
    fontWeight: "600"
  }
});
