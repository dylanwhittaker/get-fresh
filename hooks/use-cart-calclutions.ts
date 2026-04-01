import useCartStore from "@/stores/cart/cart-store";
import { useEffect, useRef } from "react";
import { toast } from "sonner-native";

export const useCartCalculations = () => {
	const hasNotifiedRef = useRef(false);
	const selectedProducts = useCartStore((state) => state.cartItems || {});
	const orderTotal = useCartStore((state) => state.orderTotal);
	const setOrderTotal = useCartStore((state) => state.setOrderTotal);

	const products = Object.values(selectedProducts);
	const totalSelectedQuantity = useCartStore((s) =>
		Object.values(s.cartItems).reduce((sum, item) => sum + item.quantity, 0)
	);

	// Notify user of free delivery
	useEffect(() => {
		const isFreeDelivery = orderTotal >= 10;

		if (isFreeDelivery && !hasNotifiedRef.current) {
			toast.info("YOUR DELIVERY IS NOW FREE");
			hasNotifiedRef.current = true;
		} else if (!isFreeDelivery && hasNotifiedRef.current) {
			hasNotifiedRef.current = false;
		}
	}, [orderTotal]);

	// Determine Total
	useEffect(() => {
		const total = products.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		setOrderTotal(Math.round(total * 100) / 100);
	}, [selectedProducts]);

	return {
		totalSelectedQuantity
	};
};
