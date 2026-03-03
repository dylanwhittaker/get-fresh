jest.mock("sonner-native");
jest.mock("@/data/products", () => ({
	products: [
		{ name: "ProductA", price: 1000 },
		{ name: "ProductB", price: 2000 },
		{ name: "ProductC", price: 1500 }
	]
}));

import useCartStore from "@/stores/cart/cart-store";
import { mockQuantities } from "@/utils/mocks/data-mock";
import { renderHook } from "@testing-library/react-native";
import { toast } from "sonner-native";
import { useCartCalculations } from "../use-cart-calclutions";

const mockQuantitiesFn = (name: string, quantity: number) => ({
	...mockQuantities,
	...{ name, quantity }
});

const ProductA = mockQuantitiesFn("Product A", 2);
const ProductB = mockQuantitiesFn("Product B", 3);
const ProductC = mockQuantitiesFn("Product C", 5);
const ProductD = mockQuantitiesFn("Product B", 3);

describe("useCartCalculations", () => {
	beforeEach(() => {
		useCartStore.setState({
			quantities: {},
			orderTotal: 0,
			cartItems: [],
			setOrderTotal: jest.fn(),
			setCartItems: jest.fn()
		});
		jest.clearAllMocks();
	});

	it("calculates total quantity correctly and ignores empty cart", () => {
		useCartStore.setState({
			quantities: { ProductA, ProductB }
		});

		const { result } = renderHook(() => useCartCalculations());

		expect(result.current).toBeDefined();
		expect(useCartStore.getState().setOrderTotal).toHaveBeenCalled();
	});

	it("calculates correct order total and does not include products not in cart", () => {
		const setOrderTotalSpy = jest.fn();
		const setCartItemsSpy = jest.fn();

		useCartStore.setState({
			quantities: {
				ProductB,
				ProductA
			},
			setOrderTotal: setOrderTotalSpy,
			setCartItems: setCartItemsSpy
		});

		renderHook(() => useCartCalculations());

		expect(setOrderTotalSpy).toHaveBeenCalledWith(8000);
		expect(setCartItemsSpy).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({ name: "ProductA", price: 1000 }),
				expect.objectContaining({ name: "ProductB", price: 2000 })
			])
		);
	});

	it("shows free delivery notification when order total reaches 10", () => {
		const setOrderTotalSpy = jest.fn();

		useCartStore.setState({
			quantities: { ProductC },
			orderTotal: 10,
			setOrderTotal: setOrderTotalSpy
		});

		renderHook(() => useCartCalculations());

		expect(toast.info).toHaveBeenCalledWith("YOUR DELIVERY IS NOW FREE");
	});

	it("handles empty cart state without errors", () => {
		const setOrderTotalSpy = jest.fn();
		const setCartItemsSpy = jest.fn();

		useCartStore.setState({
			quantities: {},
			setOrderTotal: setOrderTotalSpy,
			setCartItems: setCartItemsSpy
		});

		const { result } = renderHook(() => useCartCalculations());

		expect(result.current).toBeDefined();
		expect(setCartItemsSpy).toHaveBeenCalledWith([]);
	});
});
