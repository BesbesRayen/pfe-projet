import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { authApi } from '../api';

interface RegisterScreenProps {
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptCGU?: string;
  general?: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
  onNavigateToHome,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { setUser } = useAuth();
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigateToLogin = onNavigateToLogin || (() => navigation.navigate('Login'));
  // Remove navigation after registration - it will happen automatically when isAuthenticated becomes true

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!form.acceptCGU) {
      newErrors.acceptCGU = 'You must accept the terms & conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authApi.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      // Call setUser - this will update isAuthenticated and trigger navigation automatically
      await setUser(response.userId, response.email, response.firstName, response.lastName);
      // Navigation will happen automatically when isAuthenticated becomes true
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Registration failed. Please try again.',
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
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
      paddingVertical: spacing.sm,
    },
    backButtonText: {
      ...textStyles.label,
      color: colors.primary,
      marginLeft: spacing.sm,
      fontWeight: '600',
    },
    header: {
      marginBottom: spacing.xl,
    },
    title: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...textStyles.bodyText,
      color: colors.gray,
    },
    errorBox: {
      backgroundColor: colors.dangerBg,
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      marginBottom: spacing.lg,
    },
    errorText: {
      ...textStyles.caption,
      color: colors.dangerText,
    },
    formSection: {
      marginBottom: spacing.xl,
    },
    formRow: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    formRowInput: {
      flex: 1,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1.5,
      borderColor: form.acceptCGU ? colors.primary : colors.gray,
      borderRadius: borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
      backgroundColor: form.acceptCGU ? colors.primary : colors.white,
    },
    checkboxText: {
      ...textStyles.bodyText,
      color: colors.gray,
      flex: 1,
      lineHeight: 20,
    },
    checkboxLink: {
      color: colors.primary,
      fontWeight: '600',
    },
    checkboxError: {
      ...textStyles.caption,
      color: colors.danger,
      marginTop: spacing.sm,
    },
    loginLink: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.xl,
    },
    loginText: {
      ...textStyles.bodyText,
      color: colors.gray,
      marginRight: spacing.xs,
    },
    loginButton: {
      ...textStyles.bodyText,
      color: colors.primary,
      fontWeight: '600',
    },
    brandingHeader: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    logoText: {
      ...textStyles.brandName,
      color: colors.white,
    },
    brandName: {
      ...textStyles.pageTitle,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    tagline: {
      ...textStyles.caption,
      color: colors.gray,
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
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigateToLogin}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, color: colors.primary, lineHeight: 24 }}>←</Text>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <View style={styles.brandingHeader}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>CTN</Text>
            </View>
            <Text style={styles.brandName}>Creadi</Text>
            <Text style={styles.tagline}>Payez en toute liberté</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez Creadi et commencez votre historique
            </Text>
          </View>

          {errors.general && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          )}

          <View style={styles.formSection}>
            <View style={styles.formRow}>
              <View style={styles.formRowInput}>
                <Input
                  label="First Name"
                  placeholder="John"
                  value={form.firstName}
                  onChangeText={(text) => {
                    setForm({ ...form, firstName: text });
                    if (errors.firstName)
                      setErrors({ ...errors, firstName: undefined });
                  }}
                  error={errors.firstName}
                  marginBottom={0}
                />
              </View>
              <View style={styles.formRowInput}>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={form.lastName}
                  onChangeText={(text) => {
                    setForm({ ...form, lastName: text });
                    if (errors.lastName)
                      setErrors({ ...errors, lastName: undefined });
                  }}
                  error={errors.lastName}
                  marginBottom={0}
                />
              </View>
            </View>

            <Input
              label="Email"
              placeholder="you@example.com"
              value={form.email}
              onChangeText={(text) => {
                setForm({ ...form, email: text });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              keyboardType="email-address"
              marginBottom={spacing.lg}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              value={form.password}
              onChangeText={(text) => {
                setForm({ ...form, password: text });
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              secure
              marginBottom={spacing.lg}
            />

            <Input
              label="Confirm Password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChangeText={(text) => {
                setForm({ ...form, confirmPassword: text });
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={errors.confirmPassword}
              secure
              marginBottom={spacing.lg}
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() =>
                setForm({ ...form, acceptCGU: !form.acceptCGU })
              }
            >
              <View style={styles.checkbox}>
                {form.acceptCGU && (
                  <Text style={{ color: colors.white, fontSize: 14, lineHeight: 18 }}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text style={styles.checkboxLink}>Terms & Conditions</Text> and{' '}
                <Text style={styles.checkboxLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {errors.acceptCGU && (
              <Text style={styles.checkboxError}>{errors.acceptCGU}</Text>
            )}
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            size="lg"
            fullWidth
          />

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
