import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Button, Loader } from '../components';
import { rewardsApi, type CashbackOffer } from '../api/rewards';
import { useAuth } from '../contexts/AuthContext';

interface RewardsScreenProps {
  navigation: any;
}

const RewardsScreen: React.FC<RewardsScreenProps> = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cashback, setCashback] = useState(0);
  const [history, setHistory] = useState<{ id: number; amount: number; source: string; date: string }[]>([]);
  const [offers, setOffers] = useState<CashbackOffer[]>([]);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [cb, hist, off] = await Promise.all([
        rewardsApi.getCashback(userId),
        rewardsApi.getHistory(userId),
        rewardsApi.getOffers(userId),
      ]);
      setCashback(cb.available);
      setHistory(hist);
      setOffers(off);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Impossible de charger les rewards';
      Alert.alert('Erreur', msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

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
    cashbackCard: {
      backgroundColor: colors.primary,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.xl,
    },
    cashbackContent: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
    },
    cashbackLabel: {
      ...textStyles.label,
      color: colors.white,
      marginBottom: spacing.sm,
    },
    cashbackAmount: {
      ...textStyles.amountLarge,
      color: colors.white,
      marginBottom: spacing.md,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    historyLeft: {
      flex: 1,
    },
    historySource: {
      ...textStyles.label,
      color: colors.dark,
    },
    historyDate: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.xs,
    },
    historyAmount: {
      ...textStyles.amountSmall,
      color: colors.success,
    },
    offerCard: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    offerCardHot: {
      borderLeftColor: colors.cashback,
    },
    offerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    offerMerchant: {
      ...textStyles.label,
      color: colors.dark,
    },
    offerBadge: {
      backgroundColor: colors.cashback,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.pill,
    },
    offerBadgeText: {
      ...textStyles.micro,
      color: colors.white,
      fontWeight: '600',
    },
    offerCashback: {
      ...textStyles.amountSmall,
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    offerExpiry: {
      ...textStyles.caption,
      color: colors.gray,
    },
    hint: {
      ...textStyles.bodyText,
      color: colors.gray,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    emptyHint: {
      ...textStyles.caption,
      color: colors.gray,
      marginBottom: spacing.sm,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  if (!userId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.hint}>Connectez-vous pour voir vos rewards.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Avantages & Rewards</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.cashbackCard} shadow="lg" radius={borderRadius.lg}>
          <View style={styles.cashbackContent}>
            <Text style={styles.cashbackLabel}>💰 Cashback Disponible</Text>
            <Text style={styles.cashbackAmount}>{cashback} TND</Text>
            <Button title="Utiliser le cashback →" variant="secondary" fullWidth onPress={() => {}} />
          </View>
        </Card>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Historique des gains</Text>
          {history.length === 0 ? (
            <Text style={styles.emptyHint}>Aucun historique pour le moment.</Text>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historySource}>{item.source}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <Text style={styles.historyAmount}>+{item.amount} TND</Text>
              </View>
            ))
          )}

          <Text style={styles.sectionTitle}>Offres du moment</Text>
          {offers.length === 0 ? (
            <Text style={styles.emptyHint}>Aucune offre pour le moment.</Text>
          ) : (
            offers.map((offer) => {
              const hot = offer.percentage >= 5;
              return (
                <View key={offer.id} style={[styles.offerCard, hot && styles.offerCardHot]}>
                  <View style={styles.offerHeader}>
                    <Text style={styles.offerMerchant}>{offer.merchantName}</Text>
                    {hot && (
                      <View style={styles.offerBadge}>
                        <Text style={styles.offerBadgeText}>🔥 HOT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.offerCashback}>{offer.percentage}% Cashback</Text>
                  <Text style={styles.offerExpiry}>Expire le {offer.expiryDate}</Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;
