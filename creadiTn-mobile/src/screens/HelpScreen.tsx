import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface HelpScreenProps {
  navigation: any;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ navigation }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqData = [
    {
      title: '❓ Questions Fréquentes',
      data: [
        {
          id: '1',
          question: 'Comment créer un compte?',
          answer: 'Pour créer un compte, téléchargez l\'application et cliquez sur "S\'inscrire". Remplissez vos informations personnelles et confirmez votre email.',
        },
        {
          id: '2',
          question: 'Qu\'est-ce que le KYC?',
          answer: 'Le KYC (Know Your Customer) est un processus de vérification d\'identité qui vous permet d\'accéder à toutes nos fonctionnalités.',
        },
        {
          id: '3',
          question: 'Comment rembourser un crédit?',
          answer: 'Vous pouvez rembourser vos crédits via l\'onglet "Échéances" ou directement dans votre profil.',
        },
      ],
    },
    {
      title: '💳 Paiements',
      data: [
        {
          id: '4',
          question: 'Quels sont les moyens de paiement?',
          answer: 'Nous acceptons les virements bancaires, cartes de crédit et portefeuilles numériques.',
        },
        {
          id: '5',
          question: 'Quels sont les frais?',
          answer: 'Les frais varient selon le type de crédit. Consultez votre contrat pour plus de détails.',
        },
      ],
    },
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
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginTop: spacing.lg,
    },
    faqItem: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
    },
    faqHeader: {
      backgroundColor: colors.primaryLight,
      padding: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    faqQuestion: {
      ...textStyles.label,
      color: colors.dark,
      fontWeight: '600',
      flex: 1,
    },
    faqAnswer: {
      backgroundColor: colors.white,
      padding: spacing.md,
      ...textStyles.bodyText,
      color: colors.gray,
      lineHeight: 22,
    },
  });

  const FAQItem = ({ item }: any) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Text style={{ fontSize: 18, color: colors.primary }}>
            {isExpanded ? '−' : '+'}
          </Text>
        </View>
        {isExpanded && <Text style={styles.faqAnswer}>{item.answer}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Centre d'Aide</Text>
      </View>

      <SectionList
        sections={faqData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FAQItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default HelpScreen;
