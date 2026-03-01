import useCartStore from "@/stores/cart/cart-store";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { Image } from "expo-image";
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-paper";
import { QtyButton } from "../buttons/manage-quantity";

export type ProductListItemProps = Product;

export const ProductListItem: FC<ProductListItemProps> = memo(
  ({ name, quantity_available, price, image }) => {
    const formattedPrice = formatPrice(price);
    const outOfStock = !quantity_available;

    const selectedQuantity = useCartStore(
      (state) => state.quantities[name]?.quantity || 0
    );
    const setQuantity = useCartStore((state) => state.setQuantity);

    function incrementQuantity() {
      setQuantity(name, selectedQuantity + 1, price, quantity_available);
    }

    return (
      <View style={styles.mainContainer}>
        <View>
          <Image
            style={{
              height: 90,
              width: "auto",
              margin: 7
            }}
            source={image}
          />
        </View>
        {!!selectedQuantity && (
          <Badge style={{ position: "absolute", top: 15, right: 15 }}>
            {selectedQuantity}
          </Badge>
        )}
        <View style={styles.content}>
          <Text style={styles.mainText}>{name}</Text>
          <Text
            style={[
              styles.subText,
              outOfStock && { fontWeight: 600, color: "#ba2b2b" }
            ]}
          >
            {outOfStock ? "Out of stock" : "In Stock"}
          </Text>
        </View>

        {/* Price & Quantity Selection */}
        <View style={styles.pnqContainer}>
          {/* Quantity */}
          <View style={styles.content}>
            <Text style={styles.price}>{formattedPrice}</Text>
          </View>

          {/* + */}
          <QtyButton
            variant="product"
            icon="plus"
            onPress={incrementQuantity}
            disabled={outOfStock}
          />

          {/* Add - btn | todo */}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbcbcb",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    padding: 12,
    justifyContent: "center",
    margin: 5
  },
  groceryItemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  pnqContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pressable: {
    height: 50,
    width: 50,
    // margin: 5,
    borderRadius: 15,
    backgroundColor: "#268341"
  },
  disabledPressable: {
    backgroundColor: "#8c8c8c"
  },
  pressed: {
    opacity: 0.7
  },
  content: {
    // flex: 1
  },
  right: {
    marginLeft: 12
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600"
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
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
