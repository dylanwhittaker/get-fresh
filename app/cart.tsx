import { CartListItem } from "@/components/ui/cards/cart-list-item";
import { ProductListItemProps } from "@/components/ui/cards/product-list-item";
import { products } from "@/data/products";
import { useDebounce } from "@/hooks/use-debounce";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

products as unknown as ProductListItemProps[];

export default function CartPreview() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return products;

    return products.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const renderItem = useCallback(({ item }: any) => {
    return <CartListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      {/* FlashList */}
      <FlashList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        // style={{ padding: 5 }}
      />
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
