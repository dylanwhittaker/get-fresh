import { ImageSource } from "expo-image";

export type CartItem = {
	name: string; // doubles as id
	quantity: number; // selected quantity
	price: number;
	quantity_available: number;
	image: ImageSource;
};

type SelectedProducts = Record<string, CartItem>;

export type CartStoreState = {
	orderTotal: number;
	setOrderTotal: (value: number) => void;
	cartItems: SelectedProducts;
	setCartItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
};
