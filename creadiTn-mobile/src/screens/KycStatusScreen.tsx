import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Button, Loader } from '../components';
import { kycApi } from '../api';
import { useAuth } from '../contexts/AuthContext';
import type { KycStatus } from '../api/types';

interface KycStatusScreenProps {
  navigation: any;
}

const KycStatusScreen: React.FC<KycStatusScreenProps> = ({ navigation }) => {
  const { userId, updateKycStatus } = useAuth();
  const [kycStatus, setKycStatus] = useState<KycStatus | 'LOADING' | 'NONE'>('LOADING');

  const load = useCallback(async () => {
    if (!userId) {
      setKycStatus('NONE');
      return;
    }
    try {
      const doc = await kycApi.getStatusOptional(userId);
      if (!doc) {
        setKycStatus('NONE');
        return;
      }
      setKycStatus(doc.status);
      updateKycStatus(doc.status);
    } catch {
      setKycStatus('PENDING');
    }
  }, [userId, updateKycStatus]);

  useEffect(() => {
    void load();
  }, [load]);

  const goHome = () => {
    navigation.navigate('MainAppTabs', { screen: 'Home' });
  };

  const getStatusDisplay = () => {
    switch (kycStatus) {
      case 'NOT_SUBMITTED':
        return {
          icon: '📄',
          title: 'KYC non soumis',
          message: 'Complétez votre vérification pour accéder à tous les services.',
          color: colors.gray,
        };
      case 'PENDING':
        return {
          icon: '⏳',
          title: 'Dossier en cours de vérification',
          message:
            "Votre dossier KYC est en cours d'examen. Vous recevrez une notification dans 24-48h.",
          color: colors.warning,
        };
      case 'APPROVED':
        return {
          icon: '✅',
          title: 'Félicitations !',
          message: 'Votre identité est vérifiée. Vous pouvez maintenant accéder à toutes les fonctionnalités.',
          color: colors.success,
        };
      case 'REJECTED':
        return {
          icon: '❌',
          title: 'Dossier rejeté',
          message: 'Votre dossier KYC a été rejeté. Veuillez vérifier vos documents et resoumettre.',
          color: colors.danger,
        };
      case 'NONE':
        return {
          icon: '📄',
          title: 'Aucun dossier',
          message: "Vous n'avez pas encore soumis de documents KYC.",
          color: colors.gray,
        };
      default:
        return {
          icon: '⏳',
          title: 'Chargement…',
          message: 'Récupération du statut…',
          color: colors.gray,
        };
    }
  };

  const status = getStatusDisplay();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    card: {
      alignItems: 'center',
      padding: spacing.xl,
    },
    icon: {
      fontSize: 80,
      marginBottom: spacing.lg,
      lineHeight: 88,
    },
    title: {
      ...textStyles.pageTitle,
      color: colors.dark,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    message: {
      ...textStyles.bodyText,
      color: colors.gray,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },
    buttonGroup: {
      gap: spacing.md,
      width: '100%',
    },
  });

  if (kycStatus === 'LOADING') {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.icon}>{status.icon}</Text>
        <Text style={styles.title}>{status.title}</Text>
        <Text style={styles.message}>{status.message}</Text>

        <View style={styles.buttonGroup}>
          {kycStatus === 'APPROVED' && (
            <Button title="Aller au simulateur →" onPress={() => navigation.navigate('MainAppTabs', { screen: 'Simulator' })} />
          )}
          {kycStatus === 'REJECTED' && (
            <Button title="Resoumettre le KYC" onPress={() => navigation.navigate('Kyc')} />
          )}
          {(kycStatus === 'NONE' || kycStatus === 'NOT_SUBMITTED') && (
            <Button title="Commencer le KYC" onPress={() => navigation.navigate('Kyc')} />
          )}
          <Button title="Retour à l'accueil" onPress={goHome} variant="secondary" />
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default KycStatusScreen;
