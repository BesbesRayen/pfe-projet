import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, textStyles, spacing } from '../theme';

interface SplashScreenProps {
  onNavigationReady?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigationReady }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xxxl,
    },
    logoText: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.primary,
      lineHeight: 36,
    },
    brand: {
      fontSize: 36,
      fontWeight: '800',
      color: colors.white,
      marginBottom: spacing.md,
      lineHeight: 40,
    },
    tagline: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.primaryLight,
      textAlign: 'center',
      maxWidth: 250,
      lineHeight: 22,
    },
    loader: {
      marginTop: spacing.xxxl,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CTN</Text>
        </View>
        <Text style={styles.brand}>Creadi</Text>
        <Text style={styles.tagline}>Payez en toute liberté</Text>
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
