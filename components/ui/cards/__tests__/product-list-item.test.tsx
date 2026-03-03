import useCartStore from "@/stores/cart/cart-store";
import "@/utils/mocks/component-mocks";
import { mockProduct, mockQuantities } from "@/utils/mocks/data-mock";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ProductListItem } from "../product-list-item";

describe("ProductListItem", () => {
  beforeEach(() => {
    useCartStore.setState({
      quantities: {},
      orderTotal: 0,
      cartItems: []
    });
    jest.clearAllMocks();
  });

  describe("Positive Tests", () => {
    it("should render product name", () => {
      render(<ProductListItem {...mockProduct} />);
      expect(screen.getByText("Test Product")).toBeTruthy();
    });

    it("should render formatted price", () => {
      render(<ProductListItem {...mockProduct} />);
      expect(screen.getByText(/25/)).toBeTruthy();
    });

    it("should display 'In Stock' when quantity_available is greater than 0", () => {
      render(<ProductListItem {...mockProduct} />);
      expect(screen.getByText("In Stock")).toBeTruthy();
    });

    it("should display 'Out of stock' when quantity_available is 0", () => {
      const outOfStockProduct = { ...mockProduct, quantity_available: 0 };
      render(<ProductListItem {...outOfStockProduct} />);
      expect(screen.getByText("Out of stock")).toBeTruthy();
    });

    it("should render product image", () => {
      render(<ProductListItem {...mockProduct} />);
      expect(screen.getByTestId("product-image")).toBeTruthy();
    });

    it("should show quantity badge when selectedQuantity is greater than 0", () => {
      useCartStore.setState({
        quantities: {
          "Test Product": mockQuantities
        }
      });
      render(<ProductListItem {...mockProduct} />);
      const badge = screen.getByTestId("quantity-badge");
      expect(badge).toBeTruthy();
      expect(badge).toHaveTextContent("3");
    });

    it("should disable qty button when product is out of stock", () => {
      const outOfStockProduct = { ...mockProduct, quantity_available: 0 };
      render(<ProductListItem {...outOfStockProduct} />);
      const qtyButton = screen.getByTestId("qty-button");
      expect(qtyButton.props.disabled).toBe(true);
    });

    it("should handle missing quantity in cart store state", () => {
      const spy = jest.spyOn(useCartStore.getState(), "setQuantity");
      render(<ProductListItem {...mockProduct} />);
      const qtyButton = screen.getByTestId("qty-button");
      fireEvent.press(qtyButton);
      expect(spy).toHaveBeenCalledWith("Test Product", 1, 2500, 10);
    });

    it("should not show quantity badge when selectedQuantity is 0", () => {
      render(<ProductListItem {...mockProduct} />);
      const badge = screen.queryByTestId("quantity-badge");
      expect(badge).toBeNull();
    });

    it("should call setQuantity when qty button is pressed", () => {
      useCartStore.setState({
        quantities: { "Test Product": mockQuantities }
      });
      const spy = jest.spyOn(useCartStore.getState(), "setQuantity");
      render(<ProductListItem {...mockProduct} />);
      const qtyButton = screen.getByTestId("qty-button");
      fireEvent.press(qtyButton);
      expect(spy).toHaveBeenCalledWith("Test Product", 4, 2500, 10);
    });

    it("should enable qty button when product is in stock", () => {
      render(<ProductListItem {...mockProduct} />);
      const qtyButton = screen.getByTestId("qty-button");
      expect(qtyButton.props.disabled).toBe(false);
    });
  });
});
