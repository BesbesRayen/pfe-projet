import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface AvatarProps {
  initials: string;
  size?: number;
  bgColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 52,
  bgColor = colors.primary,
}) => {
  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      ...textStyles.cardTitle,
      color: colors.white,
      fontWeight: '700',
    },
  });

  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{initials.toUpperCase()}</Text>
    </View>
  );
};

export default Avatar;
