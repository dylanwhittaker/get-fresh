export type CartItem = {
	quantity: number;
	price: number;
	quantity_available: number;
};

type SelectedQuantities = Record<string, CartItem>;

export type CartStoreState = {
	orderTotal: number;
	setOrderTotal: (value: number) => void;
	quantities: SelectedQuantities;
	setQuantity: (
		id: string,
		qty: number,
		price: number,
		quantity_available: number
	) => void;
};
