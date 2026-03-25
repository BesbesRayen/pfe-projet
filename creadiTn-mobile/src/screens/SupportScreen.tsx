import React from 'react';
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

interface SupportScreenProps {
  navigation: any;
}

const SupportScreen: React.FC<SupportScreenProps> = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
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
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    contactCard: {
      backgroundColor: colors.primaryLight,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.md,
    },
    contactLabel: {
      ...textStyles.caption,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    contactValue: {
      ...textStyles.label,
      color: colors.primary,
      fontWeight: '700',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Client</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Nous Contacter</Text>
          <Card>
            <View style={styles.contactCard}>
              <Text style={styles.contactLabel}>Téléphone</Text>
              <Text style={styles.contactValue}>+216 71 123 456</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@creadi.tn</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={styles.contactLabel}>Horaires</Text>
              <Text style={styles.contactValue}>Lun - Ven: 9h00 - 17h00</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Chat Live</Text>
          <Button
            title="Démarrer une conversation"
            onPress={() => {}}
            size="lg"
            fullWidth
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📧 Email Support</Text>
          <Button
            title="Envoyer un email"
            onPress={() => {}}
            variant="secondary"
            size="lg"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;
