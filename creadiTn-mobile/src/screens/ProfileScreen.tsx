import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Badge, ScoreBar, Card, Loader } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface ProfileScreenProps {
  onNavigateToLogin?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigateToLogin }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { logout, userId, email, firstName, lastName, kycStatus } = useAuth();

  const navigateToLogin = onNavigateToLogin || (() => navigation.navigate('Login'));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate brief loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Use real user data from auth context
  const userFirstName = firstName || 'User';
  const userLastName = lastName || '';
  const userEmail = email || 'user@example.com';
  const userDisplay = `${userFirstName} ${userLastName}`.trim();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigateToLogin();
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xxxl,
      paddingVertical: spacing.xl,
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.lg,
    },
    avatar: {
      marginBottom: spacing.lg,
    },
    name: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.xs,
    },
    userId: {
      ...textStyles.caption,
      color: colors.gray,
      marginBottom: spacing.md,
    },
    badgeContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    badge: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.pill,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
    },
    badgeText: {
      ...textStyles.micro,
      color: colors.primary,
      fontWeight: '600',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.grayBg,
    },
    infoIcon: {
      fontSize: 18,
      marginRight: spacing.md,
      width: 24,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      ...textStyles.micro,
      color: colors.gray,
      marginBottom: spacing.xs,
    },
    infoValue: {
      ...textStyles.bodyText,
      color: colors.dark,
      fontWeight: '600',
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    scoreSection: {
      marginBottom: spacing.xl,
    },
    scoreLabel: {
      ...textStyles.label,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    logoutButton: {
      marginTop: spacing.xl,
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      backgroundColor: colors.dangerBg,
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    logoutText: {
      ...textStyles.label,
      color: colors.danger,
      fontWeight: '700',
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 400,
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

  const getInitials = () =>
    `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`.toUpperCase();

  const getKycStatusColor = () => {
    switch (kycStatus) {
      case 'APPROVED':
        return colors.success;
      case 'REJECTED':
        return colors.danger;
      default:
        return colors.warning;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Avatar initials={getInitials()} size={80} />
          </View>
          <Text style={styles.name}>
            {firstName || 'First'} {lastName || 'Name'}
          </Text>
          <Text style={styles.userId}>ID: #{userId || 'N/A'}</Text>
          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.badge,
                { backgroundColor: colors.primaryLight },
              ]}
            >
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                Member
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    kycStatus === 'APPROVED'
                      ? colors.successBg
                      : colors.warningBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color:
                      kycStatus === 'APPROVED'
                        ? colors.successText
                        : colors.warningText,
                  },
                ]}
              >
                {kycStatus || 'Pending'}
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Card shadow="none">
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📧</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email || 'No email provided'}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoIcon}>🔐</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Statut KYC</Text>
                <Text style={styles.infoValue}>{kycStatus || 'Non vérifié'}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Credit Score */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabel}>Score de Crédit</Text>
          <Card>
            <ScoreBar score={725} maxScore={1000} />
            <Text
              style={{
                ...textStyles.caption,
                color: colors.gray,
                marginTop: spacing.md,
              }}
            >
              Votre score est basé sur l'historique de paiement
            </Text>
          </Card>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>🚪 Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
