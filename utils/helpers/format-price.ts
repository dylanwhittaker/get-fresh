/**
 * Format a price value
 */
export const formatPrice = (price: number): string => {
	if (price >= 1) {
		return `R${price.toFixed(2)}`;
	} else {
		return `${Math.round(price * 100)}c`;
	}
};
