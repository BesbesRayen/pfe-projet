import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { creditsApi, paymentsApi } from '../api';
import type { InstallmentDto } from '../api/types';
import { ApiError } from '../api/client';
import { colors } from '../theme';

export default function PaymentScreen({ navigation, route }: any) {
  const { userId } = useAuth();
  const creditsId = route?.params?.creditsId ?? route?.params?.creditId;

  const [installments, setInstallments] = useState<InstallmentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(null);

  const loadInstallments = useCallback(async () => {
    if (!creditsId) return;
    setLoading(true);
    try {
      const data = await creditsApi.getInstallments(Number(creditsId));
      setInstallments(data);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erreur lors du chargement.';
      Alert.alert('Erreur', message);
    } finally {
      setLoading(false);
    }
  }, [creditsId]);

  useEffect(() => {
    if (!userId || creditsId == null) {
      Alert.alert('Erreur', 'Données manquantes (crédit).');
      navigation.goBack();
      return;
    }
    loadInstallments();
  }, [userId, creditsId, navigation, loadInstallments]);

  const processPayment = async (installmentId: number, amount: number) => {
    if (!userId) {
      Alert.alert('Erreur', 'Utilisateur non authentifié.');
      return;
    }
    setPaying(true);
    setSelectedInstallment(installmentId);
    try {
      await paymentsApi.makePayment(userId, {
        installmentId,
        amount,
        paymentMethod: 'CARD',
      });
      Alert.alert('Succès', 'Paiement effectué avec succès!', [
        { text: 'OK', onPress: () => loadInstallments() },
      ]);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erreur lors du paiement.';
      Alert.alert('Erreur', message);
    } finally {
      setPaying(false);
      setSelectedInstallment(null);
    }
  };

  const handlePayment = (installmentId: number, amount: number) => {
    Alert.alert('Confirmer le Paiement', `Payer ${amount.toFixed(2)} TND?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Payer', onPress: () => processPayment(installmentId, amount) },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return colors.success;
      case 'OVERDUE':
        return colors.danger;
      case 'PENDING':
      default:
        return colors.warning;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'Payée';
      case 'OVERDUE':
        return 'En Retard';
      case 'PENDING':
      default:
        return 'En Attente';
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { flex: 1, backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mes Paiements</Text>
      <Text style={styles.subtitle}>Échéances du crédit #{String(creditsId)}</Text>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total à payer (en attente)</Text>
          <Text style={styles.summaryAmount}>
            {installments
              .filter((i) => i.status === 'PENDING')
              .reduce((sum, i) => sum + Number(i.amount), 0)
              .toFixed(2)}{' '}
            TND
          </Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Payés</Text>
          <Text style={[styles.summaryAmount, { color: colors.primary }]}>
            {installments.filter((i) => i.status === 'PAID').length}
          </Text>
        </View>
      </View>

      {installments.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Aucun Paiement</Text>
          <Text style={styles.emptyStateText}>Aucune échéance pour ce crédit.</Text>
        </View>
      )}

      {installments.map((installment) => (
        <View key={installment.id} style={styles.installmentCard}>
          <View style={styles.installmentHeader}>
            <View style={styles.installmentInfo}>
              <Text style={styles.installmentDate}>
                {new Date(installment.dueDate).toLocaleDateString('fr-FR')}
              </Text>
              <Text style={styles.installmentDesc}>Échéance #{installment.id}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(installment.status) + '20' },
              ]}
            >
              <Text style={[styles.statusText, { color: getStatusColor(installment.status) }]}>
                {getStatusLabel(installment.status)}
              </Text>
            </View>
          </View>

          <View style={styles.installmentFooter}>
            <Text style={styles.amount}>{Number(installment.amount).toFixed(2)} TND</Text>
            {installment.status === 'PENDING' && (
              <TouchableOpacity
                style={styles.payBtn}
                onPress={() => handlePayment(installment.id, Number(installment.amount))}
                disabled={paying}
              >
                {paying && selectedInstallment === installment.id ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text style={styles.payBtnText}>Payer</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} disabled={paying}>
        <Text style={styles.backBtnText}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, color: colors.muted, fontSize: 14, lineHeight: 18 },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 20, fontWeight: '600', color: colors.foreground, marginBottom: 8, lineHeight: 24 },
  subtitle: { fontSize: 14, color: colors.muted, marginBottom: 24, lineHeight: 18 },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  summaryLabel: { fontSize: 12, color: colors.muted, marginBottom: 4, lineHeight: 16 },
  summaryAmount: { fontSize: 20, fontWeight: 'bold', color: colors.primary, lineHeight: 24 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyStateTitle: { fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 8, lineHeight: 20 },
  emptyStateText: { fontSize: 14, color: colors.muted, lineHeight: 18 },
  installmentCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  installmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  installmentInfo: { flex: 1 },
  installmentDate: { fontSize: 14, fontWeight: '600', color: colors.foreground, lineHeight: 18 },
  installmentDesc: { fontSize: 12, color: colors.muted, marginTop: 2, lineHeight: 16 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '600', lineHeight: 14 },
  installmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amount: { fontSize: 16, fontWeight: 'bold', color: colors.foreground, lineHeight: 20 },
  payBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  payBtnText: { color: colors.white, fontWeight: '600', fontSize: 12, lineHeight: 16 },
  backBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  backBtnText: { color: colors.foreground, fontWeight: '600', fontSize: 14, lineHeight: 18 },
});
