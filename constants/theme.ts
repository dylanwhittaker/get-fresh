/**
 * Get Fresh Theme Colors
 * Extracted from component styles across the application
 */

import { Platform } from "react-native";

// ============ PRIMARY BRAND COLOR ============
export const PRIMARY_GREEN = "#268341";
export const PRIMARY_DARK = "#383838";

// ============ NEUTRAL COLORS ============
export const WHITES = {
	pure: "#ffffff",
	background: "#fff"
};

export const GRAYS = {
	light: "#F5F5F5", // Light backgrounds (SearchBar)
	border: "#E8E8E8", // Light borders (SearchBar)
	secondary: "#cbcbcb", // Secondary borders (Cards)
	text: "#999999", // Placeholder text
	disabled: "#8c8c8c" // Disabled button states
};

// ============ TEXT COLORS ============
export const TEXT = {
	primary: "#333333", // Main text
	secondary: "#666666", // Secondary text (subText)
	white: "#ffffff" // White text
};

// ============ STATUS COLORS ============
export const STATUS = {
	error: "#ba2b2b", // Out of stock / errors
	disabled: "#8c8c8c", // Disabled state
	success: PRIMARY_GREEN
};

// ============ INTERACTIVE COLORS ============
export const RIPPLE = {
	product: "#8bb75c80", // More opaque ripple (Android)
	cart: "#8bb75c29" // More transparent ripple (Android)
};

// ============ THEME CONFIGURATION ============
export const Colors = {
	light: {
		text: TEXT.primary,
		background: WHITES.background,
		tint: PRIMARY_DARK,
		icon: PRIMARY_GREEN,
		tabIconDefault: GRAYS.disabled,
		tabIconSelected: PRIMARY_GREEN
	},
	dark: {
		text: TEXT.primary,
		background: WHITES.background,
		tint: PRIMARY_GREEN,
		icon: PRIMARY_GREEN,
		tabIconDefault: GRAYS.disabled,
		tabIconSelected: PRIMARY_GREEN
	}
};

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace"
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace"
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
	}
});
