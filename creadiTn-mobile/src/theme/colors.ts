export const colors = {
  // Klarna-inspired: Soft Pink/Purple Primary + Black text
  primary: '#FF1A75',            // Klarna Pink (vibrant but soft)
  primaryDark: '#E60052',        // Darker pink for interactions
  primaryLight: '#FFE8F0',       // Very light pink background

  // Modern Semantic Colors
  success: '#00C853',            // Bright Green
  warning: '#FFB81C',            // Gold
  danger: '#FF3B30',             // Bright Red
  cashback: '#FFB81C',           // Gold

  // Modern Neutral - Clean & minimal
  dark: '#000000',               // Pure black for text
  gray: '#8E8E93',               // Medium grey for secondary text
  background: '#F8F9FB',         // Soft white background (Klarna-style)
  white: '#FFFFFF',              // Pure white for cards

  // Status-specific backgrounds
  successBg: '#E8F5E9',          // Light green
  successText: '#00691B',        // Dark green
  warningBg: '#FFF9E6',          // Light gold
  warningText: '#F57F17',        // Dark gold
  dangerBg: '#FFEBEE',           // Light red
  dangerText: '#B71C1C',         // Dark red
  grayBg: '#F5F5F5',             // Light grey

  // Modern accent colors
  active: '#FF1A75',             // Pink (matches primary)
  atteinte: '#FFB81C',           // Gold
  accent: '#9C27B0',             // Soft purple (Klarna-style secondary accent)
  accentLight: '#F3E5F5',        // Light purple
  
  // Additional aliases
  foreground: '#000000',         // Black text
  card: '#FFFFFF',               // White cards
  border: '#E8E8E8',             // Very light border
  muted: '#C7C7CC',              // Muted grey
  mutedForeground: '#5A5A5E',    // Dark grey text
  
  // Modern gradient support colors - Pink to Purple
  gradientStart: '#FF1A75',      // Pink
  gradientEnd: '#9C27B0',        // Purple
  gradientSuccess: '#00C853',    // Green
  gradientWarning: '#FFB81C',    // Gold
} as const;

export type ColorName = keyof typeof colors;
