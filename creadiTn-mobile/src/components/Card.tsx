import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  radius?: number;
  padding?: number;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  shadow = 'md',
  radius = borderRadius.lg,
  padding = spacing.xl,
  gradient = false,
}) => {
  const shadowStyle = shadow === 'none' ? {} : shadows[shadow];

  const styles = StyleSheet.create({
    card: {
      backgroundColor: gradient ? colors.primaryLight : colors.white,
      borderRadius: radius,
      padding,
      ...shadowStyle,
      borderWidth: gradient ? 1 : 0,
      borderColor: gradient ? colors.primary + '20' : 'transparent',
    },
  });

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export default Card;
