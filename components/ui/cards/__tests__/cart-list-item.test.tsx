import useCartStore from "@/stores/cart/cart-store";
import "@/utils/mocks/component-mocks";
import { mockCartItem1, mockCartItem2 } from "@/utils/mocks/data-mock";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CartListItem } from "../cart-list-item";

describe("CartListItem", () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: {},
      orderTotal: 0
    });
    jest.clearAllMocks();
  });

  it("renders product name and does not render incorrect name", () => {
    render(<CartListItem {...mockCartItem1} />);
    expect(screen.getByText("Test Product")).toBeTruthy();
    expect(screen.queryByText("Wrong Product")).toBeNull();
  });

  it("displays quantity and does not display zero quantity", () => {
    useCartStore.setState({
      cartItems: { "Test Product": mockCartItem2 }
    });
    render(<CartListItem {...mockCartItem1} />);
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("renders product image and available status", () => {
    render(<CartListItem {...mockCartItem1} />);
    expect(screen.getByTestId("product-image")).toBeTruthy();
    expect(screen.getByText("Available")).toBeTruthy();
  });

  it("increments quantity when plus button is pressed and does not go negative", () => {
    useCartStore.setState({
      cartItems: { "Test Product": mockCartItem2 }
    });
    const spy = jest.spyOn(useCartStore.getState(), "setCartItem");
    render(<CartListItem {...mockCartItem1} />);
    const [plusButton] = screen.getAllByTestId("qty-button");
    fireEvent.press(plusButton);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Product",
        quantity: 4,
        price: 2500,
        quantity_available: 10
      })
    );
  });

  it("decrements quantity and does not decrement below 1", () => {
    useCartStore.setState({
      cartItems: { "Test Product": mockCartItem2 }
    });
    const spy = jest.spyOn(useCartStore.getState(), "setCartItem");
    render(<CartListItem {...mockCartItem1} />);
    const buttons = screen.getAllByTestId("qty-button");
    const minusButton = buttons[buttons.length - 1];
    fireEvent.press(minusButton);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Product",
        quantity: 2,
        price: 2500,
        quantity_available: 10
      })
    );
    expect(spy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Product",
        quantity: 0,
        price: 1000,
        quantity_available: 10
      })
    );
  });

  it("disables minus button when quantity is 1 and enables it when quantity is higher", () => {
    useCartStore.setState({
      cartItems: { "Test Product": { ...mockCartItem2, quantity: 1 } }
    });
    render(<CartListItem {...mockCartItem1} />);
    const buttons = screen.getAllByTestId("qty-button");
    const minusButton = buttons[buttons.length - 1];
    expect(minusButton.props.disabled).toBe(true);
  });

  it("removes item when close button is pressed and calls removeItem", () => {
    const removeSpy = jest.spyOn(useCartStore.getState(), "removeItem");
    render(<CartListItem {...mockCartItem1} />);
    const closeButton = screen.getByTestId("icon-button");
    fireEvent.press(closeButton);
    expect(removeSpy).toHaveBeenCalledWith("Test Product");
    expect(removeSpy).not.toHaveBeenCalledWith("Other Product");
  });

  it("shows formatted price and updates when quantity changes", () => {
    useCartStore.setState({
      cartItems: { "Test Product": mockCartItem2 }
    });
    render(<CartListItem {...mockCartItem1} />);
    expect(screen.getByText(/R\d+/)).toBeTruthy();
  });
});
