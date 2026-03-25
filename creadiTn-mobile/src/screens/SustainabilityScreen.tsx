import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Badge } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface SustainabilityScreenProps {
  navigation: any;
}

const SustainabilityScreen: React.FC<SustainabilityScreenProps> = ({ navigation }) => {
  const stats = [
    { label: 'Papier économisé', value: '2.5 kg', icon: '📄' },
    { label: 'CO2 réduit', value: '12 kg', icon: '🌍' },
    { label: 'Arbre planté', value: '1', icon: '🌱' },
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
    statsGrid: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      padding: spacing.lg,
      backgroundColor: colors.primaryLight,
      borderRadius: borderRadius.lg,
    },
    statIcon: {
      fontSize: 32,
      marginBottom: spacing.sm,
    },
    statValue: {
      ...textStyles.cardTitle,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    statLabel: {
      ...textStyles.caption,
      color: colors.primary,
      textAlign: 'center',
    },
    infoCard: {
      backgroundColor: colors.successBg,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.lg,
    },
    infoTitle: {
      ...textStyles.label,
      color: colors.successText,
      fontWeight: '700',
      marginBottom: spacing.sm,
    },
    infoText: {
      ...textStyles.bodyText,
      color: colors.successText,
      lineHeight: 22,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Développement Durable</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌱 Votre impact</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <View key={idx} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>♻️ Notre engagement</Text>
          <Card>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>100% digital</Text>
              <Text style={styles.infoText}>
                Creadi est entièrement sans papier. Tous vos documents sont numériques et sécurisés.
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Énergie renouvelable</Text>
              <Text style={styles.infoText}>
                Nos serveurs fonctionnent avec 100% d'énergie renouvelable.
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Plantation d'arbres</Text>
              <Text style={styles.infoText}>
                Pour chaque crédit approuvé, nous plantons un arbre en Tunisie.
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Notre chaîne logistique</Text>
          <Badge status="ACTIF" style={{ alignSelf: 'center', marginBottom: spacing.lg }} />
          <Card>
            <Text style={{ ...textStyles.bodyText, marginBottom: spacing.md }}>
              ✓ Fournisseurs certifiés éco-responsables
            </Text>
            <Text style={{ ...textStyles.bodyText, marginBottom: spacing.md }}>
              ✓ Transport bas carbone
            </Text>
            <Text style={{ ...textStyles.bodyText, marginBottom: spacing.md }}>
              ✓ Emballages recyclables
            </Text>
            <Text style={{ ...textStyles.bodyText }}>
              ✓ Zéro déchet en site de data center
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SustainabilityScreen;
