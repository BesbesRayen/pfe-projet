import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Card, Badge, ScoreBar, Loader, MerchantCarousel } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface HomeScreenProps {
  onNavigateToProfile?: () => void;
  onNavigateToSimulate?: () => void;
  onNavigateToMerchants?: () => void;
  onNavigateToSchedule?: () => void;
  onNavigateToRewards?: () => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  creditScore: number;
  kycStatus: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  cashback: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToProfile,
  onNavigateToSimulate,
  onNavigateToMerchants,
  onNavigateToSchedule,
  onNavigateToRewards,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { email, firstName, lastName, kycStatus } = useAuth();

  // Provide default navigation functions
  const navigateToProfile = onNavigateToProfile || (() => navigation.navigate('Profile'));
  const navigateToSimulate = onNavigateToSimulate || (() => navigation.navigate('MainAppTabs', { screen: 'Simulator' }));
  const navigateToMerchants = onNavigateToMerchants || (() => navigation.navigate('Merchants'));
  const navigateToSchedule = onNavigateToSchedule || (() => navigation.navigate('Installments'));
  const navigateToRewards = onNavigateToRewards || (() => navigation.navigate('Rewards'));

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    // Use real auth data
    const timer = setTimeout(() => {
      setProfile({
        firstName: firstName || 'User',
        lastName: lastName || '',
        creditScore: 725,
        kycStatus: kycStatus || 'PENDING',
        cashback: 4250,
      });
      setLoading(false);
      // Trigger animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    return () => clearTimeout(timer);
  }, [firstName, lastName, kycStatus, fadeAnim, slideAnim]);



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    header: {
      marginBottom: spacing.lg,
    },
    greeting: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.xs,
      fontSize: 28,
      fontWeight: '800',
    },
    email: {
      ...textStyles.bodyText,
      color: colors.gray,
      fontSize: 13,
    },
    heroCard: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginBottom: spacing.xl,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    },
    kycBanner: {
      backgroundColor: colors.warningBg,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    kycIcon: {
      fontSize: 24,
      marginRight: spacing.md,
    },
    kycContent: {
      flex: 1,
    },
    kycTitle: {
      ...textStyles.label,
      color: colors.warningText,
      marginBottom: spacing.xs,
    },
    kycDescription: {
      ...textStyles.caption,
      color: colors.warningText,
    },
    kycButton: {
      marginLeft: spacing.md,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    cashbackCard: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginBottom: spacing.xl,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 6,
    },
    cashbackLabel: {
      ...textStyles.label,
      color: colors.white,
      opacity: 0.9,
      marginBottom: spacing.sm,
      fontWeight: '600',
      fontSize: 13,
    },
    cashbackAmount: {
      fontSize: 42,
      fontWeight: '800',
      color: colors.white,
      lineHeight: 48,
    },
    cashbackCurrency: {
      ...textStyles.label,
      color: colors.white,
      marginLeft: spacing.sm,
      fontSize: 16,
      fontWeight: '700',
    },
    scoreCard: {
      marginBottom: spacing.xl,
    },
    scoreHeader: {
      marginBottom: spacing.md,
    },
    scoreLabel: {
      ...textStyles.label,
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 300,
    },
    emptyText: {
      ...textStyles.bodyText,
      color: colors.gray,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  const isKycPending = profile?.kycStatus === 'PENDING';

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Modern Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Bienvenue, {profile?.firstName}! 👋
          </Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* KYC Status Card */}
        <View style={styles.section}>
          <Card>
            <View style={{ paddingBottom: spacing.md }}>
              {isKycPending ? (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Text style={{ fontSize: 28, marginRight: spacing.md }}>⚠️</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ ...textStyles.cardTitle, color: colors.dark, marginBottom: spacing.xs }}>
                        Vérification Requise
                      </Text>
                      <Text style={{ ...textStyles.bodyText, color: colors.gray, fontSize: 13 }}>
                        Complétez votre KYC pour débloquer tous les services
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: borderRadius.lg,
                      paddingVertical: spacing.md,
                      alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('Kyc')}
                    activeOpacity={0.8}
                  >
                    <Text style={{ ...textStyles.label, color: colors.white, fontWeight: '700' }}>
                      Commencer la Vérification
                    </Text>
                  </TouchableOpacity>
                </>
              ) : profile?.kycStatus === 'APPROVED' ? (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 28, marginRight: spacing.md }}>✅</Text>
                    <View>
                      <Text style={{ ...textStyles.cardTitle, color: colors.success, marginBottom: spacing.xs }}>
                        Vérification Complète
                      </Text>
                      <Text style={{ ...textStyles.bodyText, color: colors.gray, fontSize: 13 }}>
                        Votre compte est entièrement activé
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 28, marginRight: spacing.md }}>⏳</Text>
                    <View>
                      <Text style={{ ...textStyles.cardTitle, color: colors.dark, marginBottom: spacing.xs }}>
                        Vérification en Cours
                      </Text>
                      <Text style={{ ...textStyles.bodyText, color: colors.gray, fontSize: 13 }}>
                        Nous vérifions vos informations...
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </Card>
        </View>

        {/* Cashback Widget */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              console.log('[Home] Cashback clicked:', profile?.cashback);
              Alert.alert('💰 Mon Cashback', `Vous disposez de ${profile?.cashback ?? '0'} TND de cashback disponible.\n\nUtilisez-le lors de votre prochain achat chez nos partenaires!`);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.cashbackCard}>
              <Text style={styles.cashbackLabel}>Cashback Disponible</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.cashbackAmount}>{profile?.cashback ?? '0'}</Text>
                <Text style={styles.cashbackCurrency}>TND</Text>
              </View>
              <Text style={{ ...textStyles.caption, color: colors.white, opacity: 0.9, marginTop: spacing.sm }}>Appuyez pour plus</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Merchant Carousel */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: spacing.lg }]}>Nos Partenaires 🛍️</Text>
          <MerchantCarousel />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
