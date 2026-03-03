import { products } from "@/data/products";
import useCartStore from "@/stores/cart/cart-store";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner-native";

export const useCartCalculations = () => {
	const hasNotifiedRef = useRef(false);
	const selectedProducts = useCartStore((state) => state.quantities || {});
	const orderTotal = useCartStore((state) => state.orderTotal);
	const setOrderTotal = useCartStore((state) => state.setOrderTotal);
	const setCartItems = useCartStore((state) => state.setCartItems);

	const totalSelectedQuantity = useMemo(
		() =>
			Object.values(selectedProducts).reduce(
				(sum, item) => sum + item.quantity,
				0
			),
		[selectedProducts]
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
		let total = 0;
		const filteredProducts = products.filter(
			(product) => product.name in selectedProducts
		);

		if (filteredProducts.length > 0) {
			filteredProducts.forEach((item) => {
				total += item.price * selectedProducts[item.name].quantity;
			});
		}

		setCartItems(filteredProducts);
		setOrderTotal(Math.round(total * 100) / 100);
	}, [selectedProducts]);

	return {
		totalSelectedQuantity
	};
};
