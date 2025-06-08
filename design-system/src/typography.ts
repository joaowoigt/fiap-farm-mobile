// designSystem.ts
import { StyleSheet } from "react-native";

const colors = {
  primary: "#43A047",
  primaryLight: "#66BB6A",
  secondary: "#FFB300",
  secondaryLight: "#FFD54F",
  text: "#212121",
  textSecondary: "#757575",
  background: "#E0E0E0",
  backgroundDark: "#EFECE7",
  error: "#E53935",
  errorLight: "#EF5350",
};

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

const spacing = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
};

const fontFamily = {
  sans: "Inter, ui-sans-serif, system-ui",
};

const styles = StyleSheet.create({
  // Example styles using the design tokens
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing["4"],
  },
  text: {
    fontSize: fontSizes.base,
    color: colors.text,
    fontFamily: fontFamily.sans,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: spacing["3"],
    borderRadius: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSizes.sm,
  },
  // Add more styles as needed
});

export { colors, fontSizes, spacing, fontFamily, styles };
