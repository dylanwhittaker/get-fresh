import { FC } from "react";
import { View } from "react-native";

type ProductCardProps = {};

export const ProductCard: FC<ProductCardProps> = ({}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#cbcbcb",
        borderRadius: 15,
        display: "flex",
        flexDirection: "row"
      }}
    >
      {/* <Image
        style={{
          height: 40,
          width: 80,
          margin: 7
        }}
        source={require("@/assets/images/get-fresh-logo-transparent.svg")}
      /> */}
    </View>
  );
};
