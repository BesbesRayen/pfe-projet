import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Card from './Card';
import { colors, spacing, textStyles } from '../theme';

export interface InstallmentData {
  id: number;
  amount: number;
  date: string;
  status: 'PAYÉE' | 'À PAYER' | 'EN RETARD' | 'EN ATTENTE';
  transactionRef?: string;
  penalty?: number;
}

interface InstallmentItemProps {
  installment: InstallmentData;
  onPay?: () => void;
}

const InstallmentItem: React.FC<InstallmentItemProps> = ({
  installment,
  onPay,
}) => {
  const getStatusColor = (status: InstallmentData['status']) => {
    switch (status) {
      case 'PAYÉE':
        return colors.success;
      case 'À PAYER':
        return colors.warning;
      case 'EN RETARD':
        return colors.danger;
      case 'EN ATTENTE':
        return colors.gray;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: InstallmentData['status']) => {
    switch (status) {
      case 'PAYÉE':
        return '✅';
      case 'À PAYER':
        return '⏱️';
      case 'EN RETARD':
        return '⚠️';
      case 'EN ATTENTE':
        return '🔒';
      default:
        return '';
    }
  };

  const statusColor = getStatusColor(installment.status);
  const bgColor =
    installment.status === 'PAYÉE'
      ? colors.successBg
      : installment.status === 'EN RETARD'
      ? colors.warningBg
      : colors.white;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: bgColor,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: statusColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      marginRight: spacing.md,
      fontSize: 20,
      lineHeight: 24,
    },
    amountText: {
      ...textStyles.amountSmall,
      color: colors.dark,
    },
    dateText: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.xs,
    },
    refText: {
      ...textStyles.micro,
      color: statusColor,
      marginTop: spacing.xs,
      fontWeight: '600',
    },
    penaltyText: {
      ...textStyles.bodyText,
      color: colors.danger,
      marginTop: spacing.sm,
    },
    button: {
      marginTop: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: statusColor,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      ...textStyles.label,
      color: colors.white,
    },
  });

  return (
    <Card style={styles.card} shadow="sm">
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.icon}>{getStatusIcon(installment.status)}</Text>
          <View>
            <Text style={styles.amountText}>{installment.amount} TND</Text>
            <Text style={styles.dateText}>{installment.date}</Text>
            {installment.transactionRef && (
              <Text style={styles.refText}>{installment.transactionRef}</Text>
            )}
          </View>
        </View>
      </View>

      {installment.penalty && (
        <Text style={styles.penaltyText}>
          Pénalité: +{installment.penalty} TND
        </Text>
      )}

      {installment.status === 'À PAYER' && onPay && (
        <TouchableOpacity style={styles.button} onPress={onPay}>
          <Text style={styles.buttonText}>Payer →</Text>
        </TouchableOpacity>
      )}

      {installment.status === 'EN RETARD' && onPay && (
        <TouchableOpacity style={styles.button} onPress={onPay}>
          <Text style={styles.buttonText}>Payer maintenant</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

export default InstallmentItem;
