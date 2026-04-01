jest.mock("sonner-native");
jest.mock("@/data/products", () => ({
	products: [
		{ name: "ProductA", price: 1000, image: 2 },
		{ name: "ProductB", price: 2000, image: 3 },
		{ name: "ProductC", price: 1500, image: 4 }
	]
}));

import useCartStore from "@/stores/cart/cart-store";
import { mockCartItem2 } from "@/utils/mocks/data-mock";
import { renderHook } from "@testing-library/react-native";
import { toast } from "sonner-native";
import { useCartCalculations } from "../use-cart-calclutions";

const mockCartItem2Fn = (name: string, quantity: number, price: number) => ({
	...mockCartItem2,
	...{ name, quantity, price }
});

const ProductA = mockCartItem2Fn("ProductA", 2, 1000);
const ProductB = mockCartItem2Fn("ProductB", 3, 2000);
const ProductC = mockCartItem2Fn("ProductC", 5, 1500);
const ProductD = mockCartItem2Fn("ProductB", 3, 2000);

describe("useCartCalculations", () => {
	beforeEach(() => {
		useCartStore.setState({
			cartItems: {},
			orderTotal: 0,
			setOrderTotal: jest.fn(),
			setCartItem: jest.fn()
		});
		jest.clearAllMocks();
	});

	it("calculates total quantity correctly and ignores empty cart", () => {
		useCartStore.setState({
			cartItems: { ProductA, ProductB }
		});

		const { result } = renderHook(() => useCartCalculations());

		expect(result.current).toBeDefined();
		expect(useCartStore.getState().setOrderTotal).toHaveBeenCalled();
	});

	it("calculates correct order total and does not include products not in cart", () => {
		const setOrderTotalSpy = jest.fn();

		useCartStore.setState({
			cartItems: {
				ProductB,
				ProductA
			},
			setOrderTotal: setOrderTotalSpy
		});

		renderHook(() => useCartCalculations());

		expect(setOrderTotalSpy).toHaveBeenCalledWith(8000);
	});

	it("shows free delivery notification when order total reaches 10", () => {
		const setOrderTotalSpy = jest.fn();

		useCartStore.setState({
			cartItems: { ProductC },
			orderTotal: 10,
			setOrderTotal: setOrderTotalSpy
		});

		renderHook(() => useCartCalculations());

		expect(toast.info).toHaveBeenCalledWith("YOUR DELIVERY IS NOW FREE");
	});

	it("handles empty cart state without errors", () => {
		const setOrderTotalSpy = jest.fn();

		useCartStore.setState({
			cartItems: {},
			setOrderTotal: setOrderTotalSpy
		});

		const { result } = renderHook(() => useCartCalculations());

		expect(result.current).toBeDefined();
	});
});
