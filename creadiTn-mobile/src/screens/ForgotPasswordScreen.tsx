import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button, Input } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { authApi } from '../api';

interface ForgotPasswordScreenProps {
  onNavigateToLogin?: () => void;
}

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigateToLogin }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [form, setForm] = useState<FormData>({ email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigateToLogin = onNavigateToLogin || (() => navigation.navigate('Login'));

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Call password reset API
      // TODO: Update with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitted(true);
      Alert.alert(
        'Succès',
        'Un lien de réinitialisation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.',
        [
          {
            text: 'OK',
            onPress: navigateToLogin,
          },
        ]
      );
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Request failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      justifyContent: 'space-between',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    icon: {
      fontSize: 40,
      fontWeight: '700',
      color: colors.primary,
    },
    title: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      ...textStyles.bodyText,
      color: colors.gray,
      textAlign: 'center',
      lineHeight: 22,
    },
    errorBox: {
      backgroundColor: colors.dangerBg,
      borderLeftWidth: 4,
      borderLeftColor: colors.danger,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorIconContainer: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    errorContent: {
      flex: 1,
    },
    errorText: {
      ...textStyles.caption,
      color: colors.danger,
      fontWeight: '600',
    },
    formSection: {
      marginBottom: spacing.xl,
    },
    successBox: {
      backgroundColor: colors.successBg,
      borderLeftWidth: 4,
      borderLeftColor: colors.success,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
    },
    successIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.success,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    successCheckmark: {
      fontSize: 22,
      color: colors.background,
      fontWeight: 'bold',
    },
    successContent: {
      flex: 1,
    },
    successTitle: {
      ...textStyles.label,
      color: colors.success,
      fontWeight: '700',
      marginBottom: spacing.xs,
    },
    successText: {
      ...textStyles.caption,
      color: colors.success,
      lineHeight: 18,
    },
    infoBox: {
      backgroundColor: `${colors.primary}15`,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    infoIcon: {
      fontSize: 20,
      color: colors.primary,
      marginRight: spacing.md,
      marginTop: spacing.xs,
      fontWeight: 'bold',
    },
    infoText: {
      ...textStyles.bodyText,
      color: colors.primary,
      flex: 1,
      lineHeight: 20,
    },
    buttonContainer: {
      gap: spacing.md,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: borderRadius.md,
      backgroundColor: colors.background,
      marginTop: spacing.md,
    },
    backButtonText: {
      ...textStyles.label,
      color: colors.primary,
      marginLeft: spacing.sm,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!loading}
        >
          <View>
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>🔑</Text>
              </View>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>

            {/* Error Message */}
            {errors.general && (
              <View style={styles.errorBox}>
                <View style={styles.errorIconContainer}>
                  <Text style={{ fontSize: 16, color: colors.background, lineHeight: 20 }}>!</Text>
                </View>
                <View style={styles.errorContent}>
                  <Text style={styles.errorText}>{errors.general}</Text>
                </View>
              </View>
            )}

            {/* Success Message */}
            {submitted && (
              <View style={styles.successBox}>
                <View style={styles.successIconContainer}>
                  <Text style={styles.successCheckmark}>✓</Text>
                </View>
                <View style={styles.successContent}>
                  <Text style={styles.successTitle}>Email Sent!</Text>
                  <Text style={styles.successText}>
                    Check your email for password reset instructions
                  </Text>
                </View>
              </View>
            )}

            {/* Info Box */}
            {!submitted && (
              <View style={styles.infoBox}>
                <Text style={styles.infoIcon}>ℹ</Text>
                <Text style={styles.infoText}>
                  You will receive an email with instructions to reset your password within a few minutes
                </Text>
              </View>
            )}

            {/* Form Section */}
            {!submitted && (
              <View style={styles.formSection}>
                <Input
                  label="Email Address"
                  placeholder="you@example.com"
                  value={form.email}
                  onChangeText={(text) => {
                    setForm({ ...form, email: text });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  error={errors.email}
                  keyboardType="email-address"
                  editable={!loading}
                  marginBottom={spacing.lg}
                />
              </View>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {!submitted ? (
              <Button
                title={loading ? 'Sending...' : 'Send Reset Link'}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                size="lg"
                fullWidth
              />
            ) : (
              <>
                <Button
                  title="Back to Login"
                  onPress={navigateToLogin}
                  variant="primary"
                  size="lg"
                  fullWidth
                />
                <Button
                  title="Send another email"
                  onPress={() => {
                    setSubmitted(false);
                    setForm({ email: '' });
                    setErrors({});
                  }}
                  variant="secondary"
                  size="lg"
                  fullWidth
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
