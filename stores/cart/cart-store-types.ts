import { Product } from "@/types/product";

export type CartItem = {
	quantity: number;
	price: number;
	quantity_available: number;
};

type SelectedQuantities = Record<string, CartItem>;

export type CartStoreState = {
	orderTotal: number;
	setOrderTotal: (value: number) => void;
	cartItems: Product[];
	setCartItems: (value: Product[]) => void;
	quantities: SelectedQuantities;
	setQuantity: (
		id: string,
		qty: number,
		price: number,
		quantity_available: number
	) => void;
	removeItem: (id: string) => void;
};
