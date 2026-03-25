import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secure?: boolean;
  editable?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconRightPress?: () => void;
  style?: ViewStyle;
  marginBottom?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secure = false,
  editable = true,
  keyboardType = 'default',
  icon,
  iconRight,
  onIconRightPress,
  style,
  marginBottom = spacing.md,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: error ? colors.danger : isFocused ? colors.primary : colors.border,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.md,
      backgroundColor: isFocused ? colors.primaryLight + '20' : colors.background,
      height: 48,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      color: colors.dark,
      paddingVertical: spacing.sm,
      lineHeight: 22,
    },
    icon: {
      marginRight: spacing.sm,
    },
    iconRight: {
      marginLeft: spacing.sm,
    },
    error: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.danger,
      marginTop: spacing.sm,
      lineHeight: 16,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && !showPassword}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secure && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={{ color: colors.gray, fontSize: 18 }}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
        {iconRight && !secure && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={onIconRightPress}
          >
            {iconRight}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
