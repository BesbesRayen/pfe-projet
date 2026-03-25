import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, InstallmentItem, Button, Loader } from '../components';

interface Installment {
  id: number;
  amount: number;
  date: string;
  status: 'PAYÉE' | 'À PAYER' | 'EN RETARD' | 'EN ATTENTE';
  transactionRef?: string;
  penalty?: number;
}

interface InstallmentsScreenProps {
  navigation: any;
  route: any;
}

const InstallmentsScreen: React.FC<InstallmentsScreenProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [confirmPayment, setConfirmPayment] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInstallments([
        {
          id: 1,
          amount: 400,
          date: '01/03/2026',
          status: 'PAYÉE',
          transactionRef: 'TXN-A1B2C3',
        },
        {
          id: 2,
          amount: 400,
          date: '01/04/2026',
          status: 'À PAYER',
        },
        {
          id: 3,
          amount: 400,
          date: '01/05/2026',
          status: 'EN ATTENTE',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePayPress = (installment: Installment) => {
    setSelectedInstallment(installment);
    setConfirmPayment(true);
  };

  const handleConfirmPayment = () => {
    if (selectedInstallment) {
      // Simulate payment
      setInstallments((prev) =>
        prev.map((inst) =>
          inst.id === selectedInstallment.id
            ? {
                ...inst,
                status: 'PAYÉE',
                transactionRef: `TXN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
              }
            : inst
        )
      );
      setConfirmPayment(false);
      Alert.alert('Succès', `Paiement de ${selectedInstallment.amount} TND effectué!`);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.primaryLight,
    },
    headerTitle: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    summary: {
      ...textStyles.caption,
      color: colors.gray,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      paddingBottom: spacing.xl,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.white,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      padding: spacing.xl,
      paddingBottom: spacing.xxl,
    },
    modalTitle: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    modalLabel: {
      ...textStyles.label,
      color: colors.gray,
      marginBottom: spacing.sm,
    },
    modalAmount: {
      ...textStyles.amountLarge,
      color: colors.primary,
      marginBottom: spacing.lg,
    },
    buttonGroup: {
      flexDirection: 'row',
      gap: spacing.md,
      marginTop: spacing.lg,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Échéances</Text>
        <Text style={styles.summary}>Samsung TV 65" - 1 200 TND</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {installments.map((installment) => (
          <InstallmentItem
            key={installment.id}
            installment={installment}
            onPay={() => handlePayPress(installment)}
          />
        ))}
      </ScrollView>

      {/* Payment Confirmation Modal */}
      <Modal
        visible={confirmPayment}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmPayment(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmer le paiement</Text>
            {selectedInstallment && (
              <>
                <Text style={styles.modalLabel}>Montant à payer</Text>
                <Text style={styles.modalAmount}>{selectedInstallment.amount} TND</Text>
                <Text style={styles.modalLabel}>Date d'échéance</Text>
                <Text style={styles.modalLabel}>{selectedInstallment.date}</Text>

                <View style={styles.buttonGroup}>
                  <Button
                    title="Annuler"
                    onPress={() => setConfirmPayment(false)}
                    variant="ghost"
                    fullWidth
                  />
                  <Button
                    title="Confirmer"
                    onPress={handleConfirmPayment}
                    fullWidth
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InstallmentsScreen;
