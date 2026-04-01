import useCartStore from "@/stores/cart/cart-store";
import "@/utils/mocks/component-mocks";
import { mockCartItem1, mockCartItem2 } from "@/utils/mocks/data-mock";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ProductListItem } from "../product-list-item";

describe("ProductListItem", () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: {},
      orderTotal: 0
    });
    jest.clearAllMocks();
  });

  describe("Positive Tests", () => {
    it("should render product name", () => {
      render(<ProductListItem {...mockCartItem1} />);
      expect(screen.getByText("Test Product")).toBeTruthy();
    });

    it("should render formatted price", () => {
      render(<ProductListItem {...mockCartItem1} />);
      expect(screen.getByText(/25/)).toBeTruthy();
    });

    it("should display 'In Stock' when quantity_available is greater than 0", () => {
      render(<ProductListItem {...mockCartItem1} />);
      expect(screen.getByText("In Stock")).toBeTruthy();
    });

    it("should display 'Out of stock' when quantity_available is 0", () => {
      const outOfStockProduct = { ...mockCartItem1, quantity_available: 0 };
      render(<ProductListItem {...outOfStockProduct} />);
      expect(screen.getByText("Out of stock")).toBeTruthy();
    });

    it("should render product image", () => {
      render(<ProductListItem {...mockCartItem1} />);
      expect(screen.getByTestId("product-image")).toBeTruthy();
    });

    it("should show quantity badge when selectedQuantity is greater than 0", () => {
      useCartStore.setState({
        cartItems: {
          "Test Product": mockCartItem2
        }
      });
      render(<ProductListItem {...mockCartItem1} />);
      const badge = screen.getByTestId("quantity-badge");
      expect(badge).toBeTruthy();
      expect(badge).toHaveTextContent("3");
    });

    it("should disable qty button when product is out of stock", () => {
      const outOfStockProduct = { ...mockCartItem1, quantity_available: 0 };
      render(<ProductListItem {...outOfStockProduct} />);
      const qtyButton = screen.getByTestId("qty-button");
      expect(qtyButton.props.disabled).toBe(true);
    });

    it("should handle missing quantity in cart store state", () => {
      const spy = jest.spyOn(useCartStore.getState(), "setCartItem");
      render(<ProductListItem {...mockCartItem1} />);
      const qtyButton = screen.getByTestId("qty-button");
      fireEvent.press(qtyButton);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Product",
          quantity: 1,
          price: 2500,
          quantity_available: 10
        })
      );
    });

    it("should not show quantity badge when selectedQuantity is 0", () => {
      render(<ProductListItem {...mockCartItem1} />);
      const badge = screen.queryByTestId("quantity-badge");
      expect(badge).toBeNull();
    });

    it("should call setCartItem when qty button is pressed", () => {
      useCartStore.setState({
        cartItems: { "Test Product": mockCartItem2 }
      });
      const spy = jest.spyOn(useCartStore.getState(), "setCartItem");
      render(<ProductListItem {...mockCartItem1} />);
      const qtyButton = screen.getByTestId("qty-button");
      fireEvent.press(qtyButton);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Product",
          quantity: 4,
          price: 2500,
          quantity_available: 10
        })
      );
    });

    it("should enable qty button when product is in stock", () => {
      render(<ProductListItem {...mockCartItem1} />);
      const qtyButton = screen.getByTestId("qty-button");
      expect(qtyButton.props.disabled).toBe(false);
    });
  });
});
