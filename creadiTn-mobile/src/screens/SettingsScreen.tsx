import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Button } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsScreenProps {
  navigation: any;
}

type Language = 'FR' | 'EN' | 'AR';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [auiopayEnabled, setAutopayEnabled] = useState(false);
  const [language, setLanguage] = useState<Language>('FR');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter?', [
      { text: 'Annuler', onPress: () => {} },
      {
        text: 'Déconnexion',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  const getLanguageName = (): string => {
    switch (language) {
      case 'FR':
        return 'Français';
      case 'EN':
        return 'English';
      case 'AR':
        return 'العربية';
      default:
        return 'Français';
    }
  };

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
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...textStyles.label,
      color: colors.dark,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
      fontWeight: '600',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemFirst: {
      borderTopLeftRadius: borderRadius.md,
      borderTopRightRadius: borderRadius.md,
    },
    menuItemLast: {
      borderBottomLeftRadius: borderRadius.md,
      borderBottomRightRadius: borderRadius.md,
      borderBottomWidth: 0,
    },
    menuItemContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      fontSize: 20,
      marginRight: spacing.md,
      lineHeight: 24,
    },
    menuLabel: {
      ...textStyles.bodyText,
      color: colors.dark,
    },
    menuArrow: {
      fontSize: 16,
      color: colors.gray,
      lineHeight: 20,
    },
    logoutButton: {
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.white,
      borderTopLeftRadius: borderRadius.xl,
      borderTopRightRadius: borderRadius.xl,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.xl,
    },
    modalTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    },
    languageOptionSelected: {
      backgroundColor: colors.primaryLight,
      borderBottomColor: colors.primary,
    },
    languageOptionLast: {
      borderBottomWidth: 0,
    },
    languageOptionText: {
      ...textStyles.bodyText,
      color: colors.dark,
    },
    languageCheckmark: {
      fontSize: 20,
      color: colors.primary,
    },
    modalCloseButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    modalCloseText: {
      ...textStyles.label,
      color: colors.white,
      fontWeight: '700',
    },
  });

  const MenuItem = ({ icon, label, onPress, last = false, isToggle = false, toggleValue = false, onToggle = () => {} }: any) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        last && styles.menuItemLast,
      ]}
      onPress={onPress}
      disabled={isToggle}
      activeOpacity={isToggle ? 1 : 0.7}
    >
      <View style={styles.menuItemContent}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      {isToggle ? (
        <Switch value={toggleValue} onValueChange={onToggle} />
      ) : (
        <Text style={styles.menuArrow}>→</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Réglages</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <Text style={styles.sectionTitle}>🎨 APPARENCE</Text>
        <View style={{ backgroundColor: colors.white, borderRadius: borderRadius.md }}>
          <MenuItem
            icon={theme === 'dark' ? '🌙' : '☀️'}
            label={theme === 'dark' ? 'Mode sombre activé' : 'Mode clair'}
            isToggle
            toggleValue={theme === 'dark'}
            onToggle={toggleTheme}
          />
        </View>

        {/* Payment Section */}
        <Text style={styles.sectionTitle}>💳 PAIEMENT</Text>
        <View style={{ backgroundColor: colors.white, borderRadius: borderRadius.md }}>
          <MenuItem
            icon="🔄"
            label="Autopay"
            isToggle
            toggleValue={auiopayEnabled}
            onToggle={setAutopayEnabled}
          />
          <MenuItem icon="⚙️" label="Préférences paiement" onPress={() => {}} last />
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>🔔 NOTIFICATIONS</Text>
        <View style={{ backgroundColor: colors.white, borderRadius: borderRadius.md }}>
          <MenuItem
            icon="📬"
            label="Notifications"
            isToggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          <MenuItem
            icon="💬"
            label="Notifications SMS"
            onPress={() => {}}
            last
          />
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>👤 COMPTE</Text>
        <View style={{ backgroundColor: colors.white, borderRadius: borderRadius.md }}>
          <MenuItem icon="👤" label="Infos personnelles" onPress={() => navigation.navigate('MainAppTabs', { screen: 'Profile' })} />
          <MenuItem
            icon="🌐"
            label={`Langue: ${getLanguageName()}`}
            onPress={() => setShowLanguageModal(true)}
          />
          <MenuItem icon="📢" label="Notifications" onPress={() => {}} last />
        </View>

        <View style={styles.logoutButton}>
          <Button
            title="🚪 Déconnexion"
            onPress={handleLogout}
            variant="danger"
          />
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sélectionner la langue</Text>

            {(['FR', 'EN', 'AR'] as Language[]).map((lang, index) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  language === lang && styles.languageOptionSelected,
                  index === 2 && styles.languageOptionLast,
                ]}
                onPress={() => handleLanguageSelect(lang)}
              >
                <Text style={styles.languageOptionText}>
                  {lang === 'FR'
                    ? '🇫🇷 Français'
                    : lang === 'EN'
                    ? '🇬🇧 English'
                    : '🇹🇳 العربية'}
                </Text>
                {language === lang && (
                  <Text style={styles.languageCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.modalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
