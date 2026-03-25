import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Button } from '../components';

interface SimulatorScreenProps {
  navigation: any;
}

const SimulatorScreen: React.FC<SimulatorScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState(1200);
  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [showMerchantPicker, setShowMerchantPicker] = useState(false);

  const merchants = [
    { id: 1, name: 'ElectroWorld', category: 'Tech' },
    { id: 2, name: 'FashionHub', category: 'Mode' },
    { id: 3, name: 'HealthPlus', category: 'Santé' },
  ];

  const monthlyPayment = amount / selectedInstallments;
  const installmentSchedule = Array.from({ length: selectedInstallments }, (_, i) => ({
    num: i + 1,
    amount: monthlyPayment,
    date: `${(i + 1).toString().padStart(2, '0')}/04/2026`,
  }));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    title: {
      ...textStyles.pageTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    label: {
      ...textStyles.label,
      color: colors.dark,
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    amountDisplay: {
      ...textStyles.amountLarge,
      color: colors.primary,
      marginBottom: spacing.md,
    },
    pillButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.pill,
      borderWidth: 1,
      borderColor: colors.primary,
      marginRight: spacing.sm,
    },
    pillButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    pillText: {
      ...textStyles.label,
      color: colors.primary,
    },
    pillTextActive: {
      color: colors.white,
    },
    installmentsContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    resultCard: {
      backgroundColor: colors.primaryLight,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.lg,
    },
    resultLabel: {
      ...textStyles.label,
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    resultValue: {
      ...textStyles.amountSmall,
      color: colors.primary,
      marginBottom: spacing.md,
    },
    scheduleItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    scheduleText: {
      ...textStyles.caption,
      color: colors.dark,
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
      padding: spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simulateur de Crédit</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Montant */}
        <Text style={styles.label}>Montant: {amount} TND</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={50}
          maximumValue={10000}
          step={50}
          value={amount}
          onValueChange={setAmount}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.primaryLight}
        />
        <Text style={styles.amountDisplay}>{amount} TND</Text>

        {/* Mensualités */}
        <Text style={styles.label}>Nombre de mensualités</Text>
        <View style={styles.installmentsContainer}>
          {[3, 6, 12].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.pillButton,
                selectedInstallments === num && styles.pillButtonActive,
              ]}
              onPress={() => setSelectedInstallments(num)}
            >
              <Text
                style={[
                  styles.pillText,
                  selectedInstallments === num && styles.pillTextActive,
                ]}
              >
                {num}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Marchand */}
        <Text style={styles.label}>Marchand partenaire</Text>
        <TouchableOpacity
          style={styles.resultCard}
          onPress={() => setShowMerchantPicker(true)}
        >
          <Text style={styles.resultLabel}>
            {selectedMerchant || 'Sélectionner un marchand'}
          </Text>
        </TouchableOpacity>

        {/* Résultats */}
        <Card style={styles.resultCard}>
          <Text style={styles.resultLabel}>Mensualité</Text>
          <Text style={styles.resultValue}>{monthlyPayment.toFixed(2)} TND</Text>

          <Text style={styles.resultLabel}>Intérêt</Text>
          <Text style={styles.resultValue}>0%</Text>

          <Text style={styles.resultLabel}>Total</Text>
          <Text style={styles.resultValue}>{amount} TND</Text>

          <Text style={styles.label}>Calendrier des paiements</Text>
          {installmentSchedule.map((inst, idx) => (
            <View key={idx} style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>{inst.num}. {inst.date}</Text>
              <Text style={styles.scheduleText}>{inst.amount.toFixed(2)} TND</Text>
            </View>
          ))}
        </Card>

        <Button
          title="Faire la demande →"
          onPress={() => {}}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>

      {/* Merchant Modal */}
      <Modal
        visible={showMerchantPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMerchantPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Choisir un marchand</Text>
            {merchants.map((merchant) => (
              <TouchableOpacity
                key={merchant.id}
                style={{
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
                onPress={() => {
                  setSelectedMerchant(merchant.name);
                  setShowMerchantPicker(false);
                }}
              >
                <Text style={styles.resultLabel}>{merchant.name}</Text>
                <Text style={styles.scheduleText}>{merchant.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SimulatorScreen;
