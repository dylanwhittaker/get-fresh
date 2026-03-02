import { ProductListItem } from "@/components/ui/cards/product-list-item";
import { GRAYS, PRIMARY_GREEN, TEXT, WHITES } from "@/constants/theme";
import { products } from "@/data/products";
import { useDebounce } from "@/hooks/use-debounce";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function ProductCatalog() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return products;

    return products.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const renderItem = useCallback(({ item }: any) => {
    return <ProductListItem {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        inputStyle={styles.searchInput}
        iconColor={PRIMARY_GREEN}
        placeholderTextColor={GRAYS.text}
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
  container: { flex: 1, backgroundColor: WHITES.background },

  search: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: GRAYS.light,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GRAYS.border
  },

  searchInput: {
    fontSize: 16,
    color: TEXT.primary
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
