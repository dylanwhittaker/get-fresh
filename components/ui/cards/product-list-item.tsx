import { GRAYS, STATUS, TEXT } from "@/constants/theme";
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
          <Image style={styles.image} source={image} />
        </View>
        {!!selectedQuantity && (
          <Badge style={styles.badge}>{selectedQuantity}</Badge>
        )}
        <View>
          <Text style={styles.mainText}>{name}</Text>
          <Text style={[styles.subText, outOfStock && styles.outOfStock]}>
            {outOfStock ? "Out of stock" : "In Stock"}
          </Text>
        </View>

        {/* Price & Quantity Selection */}
        <View style={styles.pnqContainer}>
          <View>
            <Text style={styles.price}>{formattedPrice}</Text>
          </View>
          <QtyButton
            variant="product"
            icon="plus"
            onPress={incrementQuantity}
            disabled={outOfStock}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: GRAYS.secondary,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    padding: 12,
    justifyContent: "center",
    margin: 5
  },
  pnqContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600"
  },
  subText: {
    fontSize: 12,
    color: TEXT.secondary,
    marginTop: 2
  },
  price: {
    fontSize: 18,
    fontWeight: "600"
  },
  image: {
    height: 90,
    width: "auto",
    margin: 7
  },
  badge: {
    position: "absolute",
    top: 15,
    right: 15
  },
  outOfStock: {
    fontWeight: 600,
    color: STATUS.error
  }
});
