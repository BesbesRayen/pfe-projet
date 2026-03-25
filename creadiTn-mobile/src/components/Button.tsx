import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}) => {
  const isDisabled = disabled || loading;
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.96,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  const getBackgroundColor = () => {
    if (isDisabled) return colors.gray;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.white;
      case 'danger':
        return colors.danger;
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getBorderColor = () => {
    if (isDisabled) return colors.gray;
    switch (variant) {
      case 'secondary':
        return colors.primary;
      case 'ghost':
        return colors.primary;
      default:
        return 'transparent';
    }
  };

  const getBorderWidth = () => {
    switch (variant) {
      case 'secondary':
      case 'ghost':
        return 1.5;
      default:
        return 0;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return colors.white;
      case 'secondary':
        return colors.primary;
      case 'ghost':
        return colors.primary;
      default:
        return colors.white;
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 40;
      case 'md':
        return 48;
      case 'lg':
        return 54;
      default:
        return 48;
    }
  };

  const styles = StyleSheet.create({
    button: {
      height: getHeight(),
      borderRadius: borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: getBorderWidth(),
      width: fullWidth ? '100%' : 'auto',
      paddingHorizontal: spacing.lg,
      ...shadows.md,
      opacity: isDisabled ? 0.6 : 1,
    },
    text: {
      color: getTextColor(),
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.3,
    },
  });

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={1}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
