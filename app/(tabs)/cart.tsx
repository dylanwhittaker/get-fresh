import { CartListItem } from "@/components/ui/cards/cart-list-item";
import { PRIMARY_GREEN, TEXT, WHITES } from "@/constants/theme";
import useCartStore from "@/stores/cart/cart-store";
import { formatPrice } from "@/utils/format-price";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { toast } from "sonner-native";

export default function CartPreview() {
  const orderTotal = useCartStore((state) => state.orderTotal);
  const cartItems = useCartStore((state) => state.cartItems);

  const displayTotal = !!orderTotal;
  const checkoutEnabled = orderTotal >= 5;

  const renderItem = useCallback(({ item }: any) => {
    return <CartListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListFooterComponent={<View style={styles.listFooter}></View>}
      />
      {cartItems.length === 0 && (
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
          toast.success("CHECKING YOU OUT");
        }}
        style={styles.cartButton}
        disabled={!checkoutEnabled}
      >
        Checkout {displayTotal && `| ${formatPrice(orderTotal)}`}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITES.background },
  cartButton: { position: "absolute", bottom: 10, left: "10%", right: "10%" },
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
  listFooter: {
    height: 60
  }
});
