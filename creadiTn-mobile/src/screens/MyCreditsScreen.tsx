import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Badge, CreditCard, Loader } from '../components';

interface Credit {
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

interface MyCreditsScreenProps {
  navigation: any;
}

const MyCreditsScreen: React.FC<MyCreditsScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'Tous' | 'Actifs' | 'Retard' | 'Terminés'>('Tous');

  useEffect(() => {
    // Simulate loading credits
    setTimeout(() => {
      setCredits([
        {
          id: 1,
          name: 'Samsung TV 65"',
          merchant: 'ElectroWorld',
          totalAmount: 1200,
          monthlyInstallment: 400,
          paidInstallments: 2,
          totalInstallments: 3,
          status: 'ACTIF',
          nextPaymentDate: '01/04',
        },
        {
          id: 2,
          name: 'MacBook Pro M3',
          merchant: 'TechStore',
          totalAmount: 3500,
          monthlyInstallment: 500,
          paidInstallments: 5,
          totalInstallments: 7,
          status: 'RETARD',
          penalty: 15,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredCredits = selectedFilter === 'Tous' 
    ? credits 
    : credits.filter(c => {
        if (selectedFilter === 'Actifs') return c.status === 'ACTIF';
        if (selectedFilter === 'Retard') return c.status === 'RETARD';
        if (selectedFilter === 'Terminés') return c.status === 'TERMINÉ';
        return false;
      });

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
    filterContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    filterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.pill,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      ...textStyles.label,
      color: colors.primary,
    },
    filterTextActive: {
      color: colors.white,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    emptyText: {
      ...textStyles.bodyText,
      color: colors.gray,
      textAlign: 'center',
      marginTop: spacing.xl,
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
        <Text style={styles.title}>Mes Crédits</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
        scrollEventThrottle={16}
      >
        {['Tous', 'Actifs', 'Retard', 'Terminés'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter as any)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredCredits.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucun crédit trouvé pour cette catégorie
          </Text>
        ) : (
          filteredCredits.map((credit) => (
            <CreditCard
              key={credit.id}
              credit={credit}
              onPress={() => navigation.navigate('Installments', { creditId: credit.id })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCreditsScreen;
