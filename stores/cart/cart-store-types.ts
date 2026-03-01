type SelectedQuantities = Record<string, number>;

export type CartStoreState = {
	orderTotal: number;
	setOrderTotal: (value: number) => void;
	quantities: SelectedQuantities;
	setQuantity: (id: string, qty: number) => void;
};
