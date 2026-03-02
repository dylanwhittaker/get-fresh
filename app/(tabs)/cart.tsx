import { CartListItem } from "@/components/ui/cards/cart-list-item";
import { PRIMARY_GREEN, TEXT, WHITES } from "@/constants/theme";
import { products } from "@/data/products";
import useCartStore from "@/stores/cart/cart-store";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { toast } from "sonner-native";

export default function CartPreview() {
  const selectedProducts = useCartStore((state) => state.quantities || {}); // Ref changed on each update - so this should be viable
  const orderTotal = useCartStore((state) => state.orderTotal);
  const setOrderTotal = useCartStore((state) => state.setOrderTotal);

  const filteredProducts = useMemo(() => {
    const selectedKeys = Object.keys(selectedProducts);
    const keysFromProducts = products.map((item) => item.name);
    let productTemp: Product[] = [];

    selectedKeys.forEach((key) => {
      const itemIndex = keysFromProducts.indexOf(key);
      if (itemIndex !== -1) {
        productTemp.push(products[itemIndex]);
      }
    });

    return productTemp;
  }, [selectedProducts]);

  const displayTotal = !!orderTotal;
  const checkoutEnabled = orderTotal >= 5;

  // Determine Total
  useEffect(() => {
    let total = 0;

    if (filteredProducts.length > 0) {
      filteredProducts.forEach((item) => {
        total += item.price * selectedProducts[item.name].quantity;
      });
    }

    setOrderTotal(Math.round(total * 100) / 100);
  }, [selectedProducts]);

  const renderItem = useCallback(({ item }: any) => {
    return <CartListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListFooterComponent={<View style={{ height: 60 }}></View>}
      />
      {filteredProducts.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={require(`@/assets/images/empty-cart.png`)}
          />
        </View>
      )}
      <Button
        icon="wallet"
        mode="contained"
        buttonColor={PRIMARY_GREEN}
        textColor={TEXT.white}
        onPress={() => {
          toast("Hello, World!");
        }}
        style={{ position: "absolute", bottom: 10, left: "10%", right: "10%" }}
        disabled={!checkoutEnabled}
      >
        Checkout {displayTotal && `| ${formatPrice(orderTotal)}`}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITES.background },

  emptyCartContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },

  emptyCartImage: {
    height: 500,
    width: 500
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1
  },

  title: {
    fontSize: 16
  },

  button: {
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },

  buttonText: {
    color: "white"
  }
});
