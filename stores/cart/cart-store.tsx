import { create } from "zustand";
import { CartStoreState } from "./cart-store-types";

const useCartStore = create<CartStoreState>()((set) => ({
  orderTotal: 0,
  quantities: {},
  setOrderTotal: (value) =>
    set(() => ({
      orderTotal: value
    })),
  setQuantity: (id, qty) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [id]: qty
      }
    }))
}));

export default useCartStore;
