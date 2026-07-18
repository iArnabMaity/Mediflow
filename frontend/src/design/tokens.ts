/**
 * MediFlow Design Tokens
 * Central source of truth for design system values
 * Inspired by MiniMax design system with healthcare-specific theming
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary - Deep Navy
  primary: "#4d7d8f",
  primaryLight: "#6b95a8",
  primaryDark: "#2d4d5f",
  
  // Teal - Healthcare Primary Accent
  teal: "#10b981",
  tealLight: "#5ffcbe",
  tealDark: "#047857",
  
  // Medical Green - Success/Positive
  success: {
    bg: "#e8ffea",
    text: "#1ba673",
    light: "#dcfce7",
    dark: "#15803d",
  },
  
  // Coral - Urgent/Attention
  coral: "#ff5530",
  coralLight: "#fca5a5",
  coralDark: "#dc2626",
  
  // Magenta - Secondary Brand
  magenta: "#ea5ec1",
  magentaLight: "#f8b4d6",
  magentaDark: "#db2777",
  
  // Blue - Information
  blue: "#1456f0",
  blueMid: "#3b82f6",
  blueDeep: "#1d4ed8",
  blue700: "#17437d",
  cyan: "#3daeff",
  blue200: "#bfdbfe",
  purple: "#a855f7",
  
  // Error & Warning
  error: {
    bg: "#ffe8e8",
    text: "#d45656",
  },
  warning: {
    bg: "#fffaeb",
    text: "#f59e0b",
  },
  info: {
    bg: "#eef2ff",
    text: "#3b82f6",
  },
  
  // Neutral Palette
  canvas: "#ffffff",
  surface: "#f7f8fa",
  surfaceSoft: "#f2f3f5",
  hairline: "#e5e7eb",
  hairlineSoft: "#eaecf0",
  
  // Text Colors
  ink: "#0a0a0a",
  inkStrong: "#000000",
  charcoal: "#222222",
  slate: "#45515e",
  steel: "#5f5f5f",
  stone: "#8e8e93",
  muted: "#a8aab2",
  
  // Footer
  footerBg: "#0a0a0a",
  onDark: "#ffffff",
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  heroDisplay: {
    fontSize: "80px",
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-2px",
  },
  displayLg: {
    fontSize: "56px",
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
  },
  displayMd: {
    fontSize: "48px",
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: "-1px",
  },
  headingLg: {
    fontSize: "40px",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-1px",
  },
  headingMd: {
    fontSize: "32px",
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
  },
  headingSm: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "0px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0px",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  bodyMd: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  bodyMdBold: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  bodySm: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  bodySmMedium: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  caption: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: "0px",
  },
  captionBold: {
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  micro: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0px",
  },
  buttonMd: {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0px",
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  xxl: "32px",
  xxxl: "40px",
  sectionSm: "48px",
  section: "64px",
  sectionLg: "80px",
  hero: "96px",
};

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "20px",
  xxxl: "24px",
  hero: "32px",
  full: "9999px",
};

// ============================================================================
// ELEVATION/SHADOW TOKENS
// ============================================================================

export const elevation = {
  none: "none",
  elevation1: "rgba(0, 0, 0, 0.04) 0px 1px 2px 0px",
  elevation2: "rgba(0, 0, 0, 0.08) 0px 4px 6px 0px",
  elevation3: "rgba(0, 0, 0, 0.08) 0px 0px 22px 0px",
  elevation4: "rgba(36, 36, 36, 0.08) 0px 12px 16px -4px",
};

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // Button Styles
  button: {
    primary: {
      bg: colors.ink,
      text: colors.onDark,
      padding: "11px 24px",
      borderRadius: borderRadius.full,
    },
    primaryPressed: {
      bg: colors.charcoal,
      text: colors.onDark,
    },
    primaryDisabled: {
      bg: colors.hairline,
      text: colors.muted,
    },
    secondary: {
      bg: "transparent",
      text: colors.ink,
      border: `1px solid ${colors.ink}`,
      padding: "11px 24px",
      borderRadius: borderRadius.full,
    },
    tertiary: {
      bg: colors.canvas,
      text: colors.ink,
      border: `1px solid ${colors.hairline}`,
      padding: "11px 24px",
      borderRadius: borderRadius.full,
    },
    ghost: {
      bg: "transparent",
      text: colors.ink,
      padding: "8px 0",
    },
    icon: {
      size: "36px",
      bg: colors.canvas,
      text: colors.ink,
      border: `1px solid ${colors.hairline}`,
      borderRadius: borderRadius.full,
    },
  },

  // Card Styles
  card: {
    base: {
      bg: colors.canvas,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      border: `1px solid ${colors.hairline}`,
      shadow: elevation.none,
    },
    feature: {
      bg: colors.surface,
      borderRadius: borderRadius.xl,
      padding: spacing.xxl,
      shadow: elevation.none,
    },
    showcase: {
      coral: {
        bg: colors.coral,
        text: colors.onDark,
        borderRadius: borderRadius.hero,
        padding: spacing.xxl,
      },
      magenta: {
        bg: colors.magenta,
        text: colors.onDark,
        borderRadius: borderRadius.hero,
        padding: spacing.xxl,
      },
      blue: {
        bg: colors.blue,
        text: colors.onDark,
        borderRadius: borderRadius.hero,
        padding: spacing.xxl,
      },
      purple: {
        bg: colors.purple,
        text: colors.onDark,
        borderRadius: borderRadius.hero,
        padding: spacing.xxl,
      },
      teal: {
        bg: colors.teal,
        text: colors.onDark,
        borderRadius: borderRadius.hero,
        padding: spacing.xxl,
      },
    },
  },

  // Input Styles
  input: {
    base: {
      bg: colors.canvas,
      text: colors.ink,
      border: `1px solid ${colors.hairline}`,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm} ${spacing.md}`,
      height: "40px",
    },
    focused: {
      border: `2px solid ${colors.blueDeep}`,
    },
    error: {
      border: `1px solid ${colors.error.text}`,
    },
    searchPill: {
      bg: colors.surface,
      text: colors.steel,
      border: `1px solid ${colors.hairline}`,
      borderRadius: borderRadius.md,
      padding: `${spacing.xs} ${spacing.md}`,
      height: "36px",
    },
  },

  // Badge Styles
  badge: {
    success: {
      bg: colors.success.bg,
      text: colors.success.text,
      borderRadius: borderRadius.full,
      padding: "4px 10px",
    },
    error: {
      bg: colors.error.bg,
      text: colors.error.text,
      borderRadius: borderRadius.full,
      padding: "4px 10px",
    },
    warning: {
      bg: colors.warning.bg,
      text: colors.warning.text,
      borderRadius: borderRadius.full,
      padding: "4px 10px",
    },
    info: {
      bg: colors.info.bg,
      text: colors.info.text,
      borderRadius: borderRadius.full,
      padding: "4px 10px",
    },
    coral: {
      bg: colors.coral,
      text: colors.onDark,
      borderRadius: borderRadius.full,
      padding: "4px 10px",
    },
  },

  // Tab Styles
  tab: {
    segmented: {
      bg: "transparent",
      text: colors.steel,
      padding: `${spacing.md} ${spacing.lg}`,
      borderBottom: "2px solid transparent",
    },
    segmentedActive: {
      text: colors.ink,
      borderBottom: `2px solid ${colors.ink}`,
    },
    pill: {
      bg: colors.canvas,
      text: colors.steel,
      border: `1px solid ${colors.hairline}`,
      borderRadius: borderRadius.full,
      padding: `${spacing.xs} ${spacing.md}`,
    },
    pillActive: {
      bg: colors.ink,
      text: colors.onDark,
      border: `1px solid ${colors.ink}`,
    },
  },

  // Navigation Styles
  nav: {
    sidebarItem: {
      bg: "transparent",
      text: colors.charcoal,
      borderRadius: borderRadius.sm,
      padding: `${spacing.xs} ${spacing.md}`,
    },
    sidebarItemActive: {
      bg: colors.surface,
      text: colors.ink,
    },
    tocItem: {
      bg: "transparent",
      text: colors.steel,
      padding: `${spacing.xs} 0`,
    },
    tocItemActive: {
      text: colors.ink,
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get typography styles as CSS object
 */
export function getTypographyStyles(
  variant: keyof typeof typography
): Record<string, string | number> {
  const typo = typography[variant];
  return {
    fontSize: typo.fontSize,
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight,
    letterSpacing: typo.letterSpacing,
  };
}

/**
 * Get component styles as CSS object
 */
export function getComponentStyles(path: string): Record<string, string> {
  const keys = path.split(".");
  let current: any = components;

  for (const key of keys) {
    current = current[key];
    if (!current) return {};
  }

  return current;
}

/**
 * Create custom color palette with opacity
 */
export function colorWithOpacity(color: string, opacity: number): string {
  // Convert hex to RGB and apply opacity
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Combine spacing values for padding/margin
 */
export function combineSpacing(
  vertical: keyof typeof spacing,
  horizontal: keyof typeof spacing
): string {
  return `${spacing[vertical]} ${spacing[horizontal]}`;
}

/**
 * Get responsive breakpoints
 */
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
};

/**
 * Container widths for layouts
 */
export const containers = {
  full: "100%",
  maxContent: "1280px",
  prose: "720px",
  sidebar: "220px",
  toc: "180px",
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  components,
  breakpoints,
  containers,
};
