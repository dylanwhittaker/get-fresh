import { Tabs } from "expo-router";
import React, { useMemo } from "react";

import { HapticTab } from "@/components/haptic-tab";
import { CartIcon } from "@/components/ui/icons/cart-icon";
import { IconSymbol } from "@/components/ui/icons/icon-symbol";
import { TopBar } from "@/components/ui/top-bar";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useCartStore from "@/stores/cart/cart-store";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const quantities = useCartStore((state) => state.quantities || 0);

  const totalSelectedQuantity = useMemo(() => {
    let total = 0;
    Object.keys(quantities).forEach((key) => {
      total += quantities[key]?.quantity || 0;
    });
    return total;
  }, [quantities]);

  return (
    <>
      <TopBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            paddingTop: 10,
            height: 80
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }) => (
              <CartIcon
                iconColour={color}
                totalSelectedQuantity={totalSelectedQuantity}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
}
