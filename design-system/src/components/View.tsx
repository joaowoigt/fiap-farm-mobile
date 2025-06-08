// designSystem.js
import { StyleSheet } from 'react-native';

// Colors
const colors = {
  primary: {
    DEFAULT: '#43A047',
    light: '#66BB6A',
  },
  secondary: {
    DEFAULT: '#FFB300',
    light: '#FFD54F',
  },
  text: {
    DEFAULT: '#212121',
    secondary: '#757575',
  },
  background: {
    DEFAULT: '#E0E0E0',
    dark: '#EFECE7',
  },
  error: {
    DEFAULT: '#E53935',
    light: '#EF5350',
  },
};

// Font Sizes
const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Spacing
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

// Font Family
const fontFamily = {
  sans: 'Inter, ui-sans-serif, system-ui',
};

// Create a StyleSheet
const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.sans,
    color: colors.text.DEFAULT,
  },
  primaryButton: {
    backgroundColor: colors.primary.DEFAULT,
    padding: spacing[4],
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: colors.secondary.DEFAULT,
    padding: spacing[4],
    borderRadius: 8,
  },
  errorText: {
    color: colors.error.DEFAULT,
  },
  // Add more styles as needed
});

// Export the design system
export { colors, fontSize, spacing, styles };