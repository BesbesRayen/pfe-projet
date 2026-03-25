import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { authApi } from '../api';
import { initializeGoogleSignIn, googleSignInService } from '../utils/googleSignIn';

interface LoginScreenProps {
  onNavigateToRegister?: () => void;
  onNavigateToHome?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToHome,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { setUser } = useAuth();
  const [form, setForm] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign-In on component mount
  useEffect(() => {
    const initGoogleSignIn = async () => {
      try {
        await initializeGoogleSignIn();
      } catch (error) {
        console.error('Failed to initialize Google Sign-In:', error);
      }
    };
    void initGoogleSignIn();
  }, []);

  const navigateToRegister = onNavigateToRegister || (() => navigation.navigate('Register'));
  // Remove navigation after login - it will happen automatically when isAuthenticated becomes true

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    console.log('[LoginScreen] Attempting login with:', form.email);
    try {
      const response = await authApi.login({ email: form.email, password: form.password });
      console.log('[LoginScreen] Login response:', response);
      console.log('[LoginScreen] Setting user with userId:', response.userId);
      // Call setUser - this will update isAuthenticated and trigger navigation automatically
      await setUser(response.userId, response.email, response.firstName, response.lastName);
      console.log('[LoginScreen] User set successfully, waiting for navigation...');
      // Navigation will happen automatically when isAuthenticated becomes true
    } catch (error) {
      console.error('[LoginScreen] Login error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!googleSignInService.isAvailable()) {
      Alert.alert(
        'Google Sign-In Not Available',
        'Google Sign-In requires a custom Expo dev client. Please use email/password login instead, or build an EAS development client.'
      );
      return;
    }

    setLoading(true);
    try {
      const googleResponse = await googleSignInService.signIn();
      
      // Send Google credentials to backend
      const response = await authApi.googleLogin({
        idToken: googleResponse.idToken,
        accessToken: googleResponse.accessToken,
      });

      // Call setUser - this will update isAuthenticated and trigger navigation automatically
      await setUser(response.userId, response.email, response.firstName, response.lastName);
      // Navigation will happen automatically when isAuthenticated becomes true
    } catch (error) {
      console.error('Google Sign-In error:', error);
      const message = error instanceof Error ? error.message : 'Google Sign-In failed. Please try again.';
      setErrors({
        general: message,
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
      paddingVertical: spacing.xxxl,
    },
    header: {
      marginBottom: spacing.xxxl,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.dark,
      marginBottom: spacing.sm,
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.gray,
      lineHeight: 22,
    },
    errorBox: {
      backgroundColor: colors.dangerBg,
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      marginBottom: spacing.lg,
    },
    errorText: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.dangerText,
      lineHeight: 16,
    },
    formSection: {
      marginBottom: spacing.xl,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.xl,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.gray,
    },
    dividerText: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.gray,
      marginHorizontal: spacing.md,
      lineHeight: 16,
    },
    googleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: borderRadius.sm,
      paddingVertical: spacing.md,
      marginBottom: spacing.lg,
    },
    googleIcon: {
      width: 20,
      height: 20,
      marginRight: spacing.sm,
    },
    googleButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.dark,
      lineHeight: 22,
    },
    registerLink: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.xl,
    },
    registerText: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.gray,
      marginRight: spacing.xs,
      lineHeight: 22,
    },
    registerButton: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
      lineHeight: 22,
    },
    brandingHeader: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xxxl,
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
      fontSize: 28,
      fontWeight: '800',
      color: colors.white,
    },
    brandName: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    tagline: {
      fontSize: 12,
      fontWeight: '400',
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
          <View style={styles.brandingHeader}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>CTN</Text>
            </View>
            <Text style={styles.brandName}>Creadi</Text>
            <Text style={styles.tagline}>Payez en toute liberté</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to your Creadi account
            </Text>
          </View>

          {errors.general && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errors.general}</Text>
            </View>
          )}

          <View style={styles.formSection}>
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
              marginBottom={spacing.md}
            />

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.primary,
                  textAlign: 'right',
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            size="lg"
            fullWidth
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            <Text style={styles.googleButtonText}>
              📱 Continue with Google
            </Text>
          </TouchableOpacity>

          <View style={styles.registerLink}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.registerButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

