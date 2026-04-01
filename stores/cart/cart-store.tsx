import { create } from "zustand";
import { CartStoreState } from "./cart-store-types";

const useCartStore = create<CartStoreState>()((set) => ({
  orderTotal: 0,
  cartItems: {},
  setOrderTotal: (value) =>
    set(() => ({
      orderTotal: value
    })),
  setCartItem: (payload) =>
    set((state) => ({
      cartItems: {
        ...state.cartItems,
        [payload.name]: payload
      }
    })),
  removeItem: (id) =>
    set((state) => {
      const newQuantities = { ...state.cartItems };
      delete newQuantities[id];
      return { cartItems: newQuantities };
    })
}));

export default useCartStore;
