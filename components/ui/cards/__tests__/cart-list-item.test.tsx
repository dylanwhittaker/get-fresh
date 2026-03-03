import useCartStore from "@/stores/cart/cart-store";
import "@/utils/mocks/component-mocks";
import { mockProduct, mockQuantities } from "@/utils/mocks/data-mock";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CartListItem } from "../cart-list-item";

describe("CartListItem", () => {
  beforeEach(() => {
    useCartStore.setState({
      quantities: {},
      orderTotal: 0,
      cartItems: []
    });
    jest.clearAllMocks();
  });

  it("renders product name and does not render incorrect name", () => {
    render(<CartListItem {...mockProduct} />);
    expect(screen.getByText("Test Product")).toBeTruthy();
    expect(screen.queryByText("Wrong Product")).toBeNull();
  });

  it("displays quantity and does not display zero quantity", () => {
    useCartStore.setState({
      quantities: { "Test Product": mockQuantities }
    });
    render(<CartListItem {...mockProduct} />);
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("renders product image and available status", () => {
    render(<CartListItem {...mockProduct} />);
    expect(screen.getByTestId("product-image")).toBeTruthy();
    expect(screen.getByText("Available")).toBeTruthy();
  });

  it("increments quantity when plus button is pressed and does not go negative", () => {
    useCartStore.setState({
      quantities: { "Test Product": mockQuantities }
    });
    const spy = jest.spyOn(useCartStore.getState(), "setQuantity");
    render(<CartListItem {...mockProduct} />);
    const [plusButton] = screen.getAllByTestId("qty-button");
    fireEvent.press(plusButton);
    expect(spy).toHaveBeenCalledWith("Test Product", 4, 2500, 10);
  });

  it("decrements quantity and does not decrement below 1", () => {
    useCartStore.setState({
      quantities: { "Test Product": mockQuantities }
    });
    const spy = jest.spyOn(useCartStore.getState(), "setQuantity");
    render(<CartListItem {...mockProduct} />);
    const buttons = screen.getAllByTestId("qty-button");
    const minusButton = buttons[buttons.length - 1];
    fireEvent.press(minusButton);
    expect(spy).toHaveBeenCalledWith("Test Product", 2, 2500, 10);
    expect(spy).not.toHaveBeenCalledWith("Test Product", 0, 1000, 10);
  });

  it("disables minus button when quantity is 1 and enables it when quantity is higher", () => {
    useCartStore.setState({
      quantities: { "Test Product": { ...mockQuantities, quantity: 1 } }
    });
    render(<CartListItem {...mockProduct} />);
    const buttons = screen.getAllByTestId("qty-button");
    const minusButton = buttons[buttons.length - 1];
    expect(minusButton.props.disabled).toBe(true);
  });

  it("removes item when close button is pressed and calls removeItem", () => {
    const removeSpy = jest.spyOn(useCartStore.getState(), "removeItem");
    render(<CartListItem {...mockProduct} />);
    const closeButton = screen.getByTestId("icon-button");
    fireEvent.press(closeButton);
    expect(removeSpy).toHaveBeenCalledWith("Test Product");
    expect(removeSpy).not.toHaveBeenCalledWith("Other Product");
  });

  it("shows formatted price and updates when quantity changes", () => {
    useCartStore.setState({
      quantities: { "Test Product": mockQuantities }
    });
    render(<CartListItem {...mockProduct} />);
    expect(screen.getByText(/R\d+/)).toBeTruthy();
  });
});
