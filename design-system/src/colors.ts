// designSystem.ts
import { StyleSheet } from "react-native";

// Define colors based on the Tailwind config
const colors = {
  primary: "#43A047",
  primaryLight: "#66BB6A",
  secondary: "#FFB300",
  secondaryLight: "#FFD54F",
  text: {
    default: "#212121",
    secondary: "#757575",
  },
  background: {
    default: "#E0E0E0",
    dark: "#EFECE7",
  },
  error: {
    default: "#E53935",
    light: "#EF5350",
  },
};

// Define font sizes based on the Tailwind config
const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};

// Define spacing based on the Tailwind config
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

// Define font family
const fontFamily = {
  sans: "Inter, ui-sans-serif, system-ui",
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.sans,
  },
  primaryText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.secondary,
  },
  errorText: {
    color: colors.error.default,
  },
  background: {
    backgroundColor: colors.background.default,
  },
});

const padding = (size: keyof typeof spacing) => ({
  padding: spacing[size],
});

const margin = (size: keyof typeof spacing) => ({
  margin: spacing[size],
});

const fontSizeStyle = (size: keyof typeof fontSizes) => ({
  fontSize: fontSizes[size],
  lineHeight: fontSizes[size] * 1.5,
});
export { colors, fontSizes, spacing, styles, fontSizeStyle, padding, margin };
