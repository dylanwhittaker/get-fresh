import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CartStoreState } from "./cart-store-types";

const useCartStoreWIthImmer = create<CartStoreState>()(
  immer((set) => ({
    orderTotal: 0,
    quantities: {},
    setOrderTotal: (value) =>
      set((state) => {
        state.orderTotal = value;
      }),
    setQuantity: (id, qty, price, quantity_available) =>
      set((state) => {
        state.quantities = {
          ...state.quantities,
          [id]: {
            quantity: qty, // only modifying qty
            price,
            quantity_available
          }
        };
      })
  }))
);

export default useCartStoreWIthImmer;
