import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface PaymentsScreenProps {
  navigation: any;
}

const PaymentsScreen: React.FC<PaymentsScreenProps> = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    { id: '1', name: 'Carte bancaire', icon: '💳', last4: '4242' },
    { id: '2', name: 'Virement bancaire', icon: '🏦', account: 'IBAN*****2345' },
    { id: '3', name: 'Portefeuille Tunisie Télécom', icon: '📱', number: '+216*****1234' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      ...textStyles.pageTitle,
      color: colors.dark,
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    paymentCard: {
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    paymentCardSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight + '40',
    },
    paymentInfo: {
      flex: 1,
    },
    paymentIcon: {
      fontSize: 32,
      marginRight: spacing.md,
    },
    paymentName: {
      ...textStyles.label,
      color: colors.dark,
      fontWeight: '600',
    },
    paymentDetail: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.xs,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Méthodes de Paiement</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💳 Vos méthodes</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedPayment === method.id && styles.paymentCardSelected,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{method.name}</Text>
                  <Text style={styles.paymentDetail}>
                    {(method as any).last4 || (method as any).account || (method as any).number}
                  </Text>
                </View>
              </View>
              {selectedPayment === method.id && (
                <Text style={{ fontSize: 20, color: colors.primary }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>➕ Ajouter une méthode</Text>
          <Button
            title="Ajouter une carte"
            onPress={() => {}}
            variant="secondary"
            size="lg"
            fullWidth
          />
        </View>

        {selectedPayment && (
          <Button
            title="Confirmer la sélection"
            onPress={() => {}}
            size="lg"
            fullWidth
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentsScreen;
