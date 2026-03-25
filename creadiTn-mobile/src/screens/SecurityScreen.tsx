import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface SecurityScreenProps {
  navigation: any;
}

const SecurityScreen: React.FC<SecurityScreenProps> = ({ navigation }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
    securityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    securityItemLast: {
      borderBottomWidth: 0,
    },
    securityInfo: {
      flex: 1,
    },
    securityLabel: {
      ...textStyles.label,
      color: colors.dark,
      fontWeight: '600',
    },
    securityDescription: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.xs,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sécurité et Confidentialité</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Authentification</Text>
          <Card shadow="sm">
            <View style={styles.securityItem}>
              <View style={styles.securityInfo}>
                <Text style={styles.securityLabel}>Authentification biométrique</Text>
                <Text style={styles.securityDescription}>Empreinte/Face ID</Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: colors.gray, true: colors.primaryLight }}
                thumbColor={biometricEnabled ? colors.primary : colors.gray}
              />
            </View>

            <View style={[styles.securityItem, styles.securityItemLast]}>
              <View style={styles.securityInfo}>
                <Text style={styles.securityLabel}>Authentification 2FA</Text>
                <Text style={styles.securityDescription}>Code à usage unique</Text>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: colors.gray, true: colors.primaryLight }}
                thumbColor={twoFactorEnabled ? colors.primary : colors.gray}
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔑 Mot de passe</Text>
          <Button
            title="Changer le mot de passe"
            onPress={() => {}}
            size="lg"
            fullWidth
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Sessions actives</Text>
          <Card shadow="sm">
            <View style={styles.securityItem}>
              <View style={styles.securityInfo}>
                <Text style={styles.securityLabel}>iPhone 12 Pro</Text>
                <Text style={styles.securityDescription}>Actif maintenant</Text>
              </View>
              <Text style={{ color: colors.success }}>✓</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Compte</Text>
          <Button
            title="Supprimer mon compte"
            onPress={() => {}}
            variant="danger"
            size="lg"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityScreen;
