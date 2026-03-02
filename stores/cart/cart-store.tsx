import { create } from "zustand";
import { CartStoreState } from "./cart-store-types";

const useCartStore = create<CartStoreState>()((set) => ({
  orderTotal: 0,
  quantities: {},
  cartItems: [],
  setOrderTotal: (value) =>
    set(() => ({
      orderTotal: value
    })),
  setQuantity: (id, qty, price, quantity_available) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [id]: {
          quantity: qty,
          price,
          quantity_available
        }
      }
    })),
  removeItem: (id) =>
    set((state) => {
      const newQuantities = { ...state.quantities };
      delete newQuantities[id];
      return { quantities: newQuantities };
    }),
  setCartItems: (value) =>
    set(() => ({
      cartItems: value
    }))
}));

export default useCartStore;
