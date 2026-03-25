export const typography = {
  sizes: {
    brandName: 28,
    pageTitle: 22,
    cardTitle: 18,
    bodyText: 15,
    label: 13,
    caption: 12,
    micro: 12,
    amountLarge: 28,
    amountSmall: 16,
  },
  weights: {
    extraBold: '800' as const,
    bold: '700' as const,
    semiBold: '600' as const,
    medium: '500' as const,
    regular: '400' as const,
  },
  lineHeights: {
    tight: 28,
    normal: 22,
    relaxed: 26,
  },
} as const;

export const textStyles = {
  brandName: {
    fontSize: typography.sizes.brandName,
    fontWeight: typography.weights.extraBold,
    lineHeight: typography.lineHeights.tight,
    color: '#1A73E8', // primary
  },
  pageTitle: {
    fontSize: typography.sizes.pageTitle,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.tight,
    color: '#0D1117', // dark
  },
  cardTitle: {
    fontSize: typography.sizes.cardTitle,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.normal,
    color: '#0D1117', // dark
  },
  bodyText: {
    fontSize: typography.sizes.bodyText,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
    color: '#0D1117', // foreground
  },
  label: {
    fontSize: typography.sizes.label,
    fontWeight: typography.weights.semiBold,
    lineHeight: typography.lineHeights.normal,
    color: '#0D1117', // dark
  },
  caption: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.normal,
    color: '#6B7280', // gray
  },
  micro: {
    fontSize: typography.sizes.micro,
    fontWeight: typography.weights.medium,
    lineHeight: typography.lineHeights.normal,
    color: '#6B7280', // gray
  },
  amountLarge: {
    fontSize: typography.sizes.amountLarge,
    fontWeight: typography.weights.extraBold,
    lineHeight: typography.lineHeights.tight,
    color: '#1A73E8', // primary
  },
  amountSmall: {
    fontSize: typography.sizes.amountSmall,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.normal,
    color: '#0D1117', // dark
  },
} as const;
