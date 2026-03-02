import { GRAYS, PRIMARY_GREEN, TEXT } from "@/constants/theme";
import useCartStore from "@/stores/cart/cart-store";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { Image } from "expo-image";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { QtyButton } from "../buttons/manage-quantity";

export type CartListItemProps = Product;

export const CartListItem: FC<CartListItemProps> = memo(
  ({ name, price, quantity_available, image }) => {
    const selectedQuantity = useCartStore(
      (state) => state.quantities[name]?.quantity || 0
    );
    const setQuantity = useCartStore((state) => state.setQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    // ToDo: Once Toast Added:
    // Ensure that Quantity Cannot be Exceeded - by checking "selectedQuantity + 1" value.
    // If exceededed - display error toast.

    function incrementQuantity() {
      setQuantity(name, selectedQuantity + 1, price, quantity_available);
    }

    const canDecrement = selectedQuantity - 1 > 0;

    function decrementQuantity() {
      // ToDo: Once Toast Added:
      // Send a toast to tell user they cannot lower the quantity to less than 1 - they can clear the item from cart instead.
      if (canDecrement) {
        setQuantity(name, selectedQuantity - 1, price, quantity_available);
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20,
            width: 100
          }}
        >
          <Image
            style={{
              height: 60,
              width: 100
            }}
            source={image}
          />
        </View>

        <View style={styles.manageQContainer}>
          <Text style={styles.mainText}>{name}</Text>
          <Text style={[styles.subText]}>Available</Text>

          {/* Manage Quantities */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <QtyButton
              variant="cart"
              icon="plus"
              size="s"
              onPress={incrementQuantity}
            />
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: 10
              }}
            >
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
    // borderBottomColor: "#cbcbcb",
    // borderRadius: 20,
    display: "flex",
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
  groceryItemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  manageQContainer: {
    flex: 1
  },
  pnqContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  pressable: {
    height: 50,
    width: 50,
    // margin: 5,
    borderRadius: 15,
    backgroundColor: PRIMARY_GREEN
  },
  disabledPressable: {
    backgroundColor: GRAYS.disabled
  },
  pressed: {
    opacity: 0.7
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
  },
  icon: {
    color: "#ffffff",
    height: 30, // height & width - size SF symbols
    width: 30,
    left: 10,
    top: 10,
    fontSize: 30, // sizes material
    position: "absolute",
    borderRadius: 5
  }
});
