import {
  ProductListItem,
  ProductListItemProps
} from "@/components/ui/cards/product-list-item";
import { products } from "@/data/products";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

// ToDo: Make this component generic and reusable so it will accept data as T[]
const DATA = products as unknown as ProductListItemProps[];

// Debounce hook: ToDo - move to hooks
const useDebounce = (value: string, delay: number) => {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return DATA;

    return DATA.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return <ProductListItem {...item} />;
    },
    [quantities]
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* FlashList */}
      <FlashList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        style={{ padding: 5 }}
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
