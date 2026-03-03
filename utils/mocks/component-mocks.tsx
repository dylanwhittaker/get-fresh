jest.mock("@/components/ui/buttons/manage-quantity", () => ({
  QtyButton: ({ onPress, disabled, ...props }: any) => (
    <button
      testID="qty-button"
      onPress={onPress}
      disabled={disabled}
      {...props}
    />
  )
}));

jest.mock("expo-image", () => ({
  Image: ({ source, style, ...props }: any) => (
    <div
      testID="product-image"
      data-source={JSON.stringify(source)}
      {...props}
    />
  )
}));

jest.mock("react-native-paper", () => ({
  Badge: ({ children, style, ...props }: any) => (
    <div testID="quantity-badge" {...props}>
      {children}
    </div>
  )
}));
