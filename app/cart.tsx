import { CartListItem } from "@/components/ui/cards/cart-list-item";
import { products } from "@/data/products";
import useCartStore from "@/stores/cart/cart-store";
import { Product } from "@/types/product";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function CartPreview() {
  const selectedProducts = useCartStore((state) => state.quantities || {}); // Ref changed on each update - so this should be viable
  // const orderTotal = useCartStore((state) => state.orderTotal);
  // const setOrderTotal = useCartStore((state) => state.setOrderTotal);

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

  // // Determine Total
  // useEffect(() => {
  //   let total = 0;

  //   if(filteredProducts.length > 0) {
  //     filteredProducts.forEach(item => {
  //       total += item.price * selectedProducts[item.name]
  //     })
  //   }

  //   setOrderTotal(total);
  // }, [selectedProducts]);

  const renderItem = useCallback(({ item }: any) => {
    return <CartListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button
        icon="camera"
        mode="contained-tonal"
        onPress={() => console.log("Pressed")}
        style={{ margin: 40 }}
      >
        Checkout
        {/* Checkout: {orderTotal} */}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  search: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
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
