import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Card from './Card';
import Badge from './Badge';
import { colors, spacing, textStyles } from '../theme';

export interface CreditData {
  id: number;
  name: string;
  merchant: string;
  totalAmount: number;
  monthlyInstallment: number;
  paidInstallments: number;
  totalInstallments: number;
  status: 'ACTIF' | 'RETARD' | 'TERMINÉ' | 'EN ATTENTE';
  nextPaymentDate?: string;
  penalty?: number;
}

interface CreditCardProps {
  credit: CreditData;
  onPress: () => void;
  onPayPress?: () => void;
}

const CreditCard: React.FC<CreditCardProps> = ({
  credit,
  onPress,
  onPayPress,
}) => {
  const percentage = (credit.paidInstallments / credit.totalInstallments) * 100;
  const barColor =
    credit.status === 'ACTIF'
      ? colors.primary
      : credit.status === 'RETARD'
      ? colors.danger
      : credit.status === 'TERMINÉ'
      ? colors.success
      : colors.gray;

  const styles = StyleSheet.create({
    card: {
      marginBottom: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.md,
    },
    headerLeft: {
      flex: 1,
    },
    productName: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.xs,
    },
    merchant: {
      ...textStyles.caption,
      color: colors.gray,
    },
    amount: {
      ...textStyles.amountSmall,
      color: colors.dark,
    },
    badge: {
      marginLeft: spacing.md,
    },
    progressContainer: {
      marginVertical: spacing.md,
    },
    progressBar: {
      height: 6,
      backgroundColor: colors.primaryLight,
      borderRadius: 3,
      overflow: 'hidden',
      marginBottom: spacing.sm,
    },
    progressFill: {
      height: '100%',
      backgroundColor: barColor,
      width: `${percentage}%`,
    },
    progressText: {
      ...textStyles.caption,
      color: colors.gray,
    },
    nextPayment: {
      ...textStyles.bodyText,
      color: colors.dark,
      marginTop: spacing.md,
    },
    penalty: {
      ...textStyles.bodyText,
      color: colors.danger,
      marginTop: spacing.sm,
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.productName}>{credit.name}</Text>
          <Text style={styles.merchant}>{credit.merchant}</Text>
          <Text style={styles.amount}>{credit.totalAmount} TND</Text>
        </View>
        <Badge status={credit.status} style={styles.badge} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>
          {credit.paidInstallments}/{credit.totalInstallments} payées
        </Text>
      </View>

      {credit.status === 'ACTIF' && credit.nextPaymentDate && (
        <Text style={styles.nextPayment}>
          📅 {credit.nextPaymentDate} — {credit.monthlyInstallment} TND
        </Text>
      )}

      {credit.status === 'RETARD' && credit.penalty && (
        <Text style={styles.penalty}>
          Pénalité: +{credit.penalty} TND
        </Text>
      )}
    </Card>
  );
};

export default CreditCard;
