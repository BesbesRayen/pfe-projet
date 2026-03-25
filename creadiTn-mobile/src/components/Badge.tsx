import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

type BadgeStatus = 'ACTIF' | 'PAYÉ' | 'RETARD' | 'EN ATTENTE' | 'TERMINÉ';

interface BadgeProps {
  status: BadgeStatus;
  style?: any;
}

const Badge: React.FC<BadgeProps> = ({ status, style }) => {
  const getStatusColors = (status: BadgeStatus) => {
    switch (status) {
      case 'ACTIF':
      case 'PAYÉ':
        return { bg: colors.successBg, text: colors.successText };
      case 'RETARD':
        return { bg: colors.dangerBg, text: colors.dangerText };
      case 'EN ATTENTE':
        return { bg: colors.warningBg, text: colors.warningText };
      case 'TERMINÉ':
        return { bg: colors.grayBg, text: colors.gray };
      default:
        return { bg: colors.primaryLight, text: colors.primary };
    }
  };

  const { bg, text } = getStatusColors(status);

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: bg,
      borderRadius: borderRadius.pill,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      alignSelf: 'flex-start',
    },
    text: {
      ...textStyles.micro,
      color: text,
      fontWeight: '600' as const,
      lineHeight: 14,
    },
  });

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

export default Badge;
