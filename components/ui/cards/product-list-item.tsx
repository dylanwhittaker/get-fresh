import { formatPrice } from "@/utils/format-price";
import { Image, ImageSource } from "expo-image";
import { FC, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-paper";
import { IconSymbol } from "../icon-symbol";

export type ProductListItemProps = {
  name: string;
  quantity_available: number;
  price: number;
  image: ImageSource;
  selectedQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

export const ProductListItem: FC<ProductListItemProps> = memo(
  ({
    name,
    quantity_available,
    price,
    image,
    selectedQuantity = 0,
    onQuantityChange
  }) => {
    const formattedPrice = formatPrice(price);

    function incrementQuantity() {
      onQuantityChange?.(selectedQuantity + 1);
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
              !quantity_available && { fontWeight: 600, color: "#ba2b2b" }
            ]}
          >
            {quantity_available ? "In Stock" : "Out of stock"}
          </Text>
        </View>

        {/* Price & Quantity Selection */}
        <View style={styles.pnqContainer}>
          {/* Quantity */}
          <View style={styles.content}>
            <Text style={styles.price}>{formattedPrice}</Text>
          </View>

          {/* + */}
          {/* todo: Make the pressable a button variant */}
          <Pressable
            android_ripple={{
              color: "rgba(202, 202, 202, 0.5)",
              foreground: true,
              borderless: true
              // radius: 30
            }}
            onPress={incrementQuantity}
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressed
            ]}
          >
            <IconSymbol
              size={310}
              color="#ffffff"
              name="plus"
              style={styles.icon}
            />
          </Pressable>

          {/* - | todo */}
          {/* <Pressable
            android_ripple={{
              color: "rgba(202, 202, 202, 0.5)",
              foreground: true,
              borderless: true,
              radius: 30
            }}
            onPress={() => {}}
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressed
            ]}
          >
            <IconSymbol
              size={310}
              color="#ffffff"
              name="plus"
              style={styles.icon}
            />
          </Pressable> */}
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
