import { Image } from "expo-image";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TopBar: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ marginTop: insets.top }, styles.container]}>
      <Image
        style={styles.image}
        source={require("@/assets/images/get-fresh-logo-transparent.svg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#fff"
  },
  image: {
    height: 40,
    width: 80,
    margin: 7
  }
});
