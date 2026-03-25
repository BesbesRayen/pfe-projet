import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Card, Button } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface MenuScreenProps {
  onNavigateToLogin?: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigateToLogin }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { logout, userId, email, firstName, lastName, kycStatus } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editFirstName, setEditFirstName] = useState(firstName || '');
  const [editLastName, setEditLastName] = useState(lastName || '');
  const [editEmail, setEditEmail] = useState(email || '');
  const [editPassword, setEditPassword] = useState('');
  const [editPasswordConfirm, setEditPasswordConfirm] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const navigateToLogin = onNavigateToLogin || (() => navigation.navigate('Login'));

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigateToLogin();
          },
        },
      ]
    );
  };

  const handleSendHelp = () => {
    if (!helpMessage.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir votre message.');
      return;
    }
    console.log('[Support] Help message from', email, ':', helpMessage);
    Alert.alert('✅ Message envoyé', 'Merci! Notre équipe vous répondra bientôt.');
    setHelpMessage('');
    setShowHelpModal(false);
  };

  const handleUpdateProfile = () => {
    if (!editFirstName.trim() || !editLastName.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir votre prénom et nom.');
      return;
    }
    if (showPasswordFields) {
      if (!editPassword.trim()) {
        Alert.alert('Erreur', 'Veuillez saisir un nouveau mot de passe.');
        return;
      }
      if (editPassword !== editPasswordConfirm) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
        return;
      }
      if (editPassword.length < 6) {
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
        return;
      }
    }
    console.log('[Profile] Update:', { editFirstName, editLastName, changePassword: showPasswordFields });
    Alert.alert('✅ Profil mis à jour', 'Vos informations ont été mises à jour avec succès.');
    setShowProfileModal(false);
  };

  const displayName = firstName && lastName ? `${firstName} ${lastName}` : 'User';
  const userInitials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`.toUpperCase();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      paddingBottom: spacing.xl,
    },
    profileSection: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
      marginBottom: spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.lg,
    },
    avatarText: {
      ...textStyles.label,
      color: colors.white,
      fontWeight: '700',
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.xs,
    },
    profileEmail: {
      ...textStyles.caption,
      color: colors.gray,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...textStyles.label,
      color: colors.dark,
      fontWeight: '700',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    menuIcon: {
      fontSize: 20,
      marginRight: spacing.lg,
      width: 28,
    },
    menuLabel: {
      ...textStyles.bodyText,
      color: colors.dark,
      flex: 1,
    },
    menuArrow: {
      fontSize: 16,
      color: colors.gray,
    },
    logoutButton: {
      backgroundColor: colors.danger,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      marginTop: spacing.xl,
    },
    logoutText: {
      ...textStyles.label,
      color: colors.white,
      fontWeight: '700',
    },
    modalContent: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.xl,
      padding: spacing.xl,
      marginHorizontal: spacing.lg,
      marginTop: 'auto',
      marginBottom: spacing.lg,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    modalTitle: {
      ...textStyles.pageTitle,
      color: colors.dark,
      textAlign: 'center',
      flex: 1,
    },
    modalClose: {
      fontSize: 24,
      color: colors.gray,
      width: 30,
      textAlign: 'center',
    },
    modalLabel: {
      ...textStyles.label,
      color: colors.dark,
      marginBottom: spacing.sm,
      fontWeight: '600',
    },
    helpInput: {
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      backgroundColor: colors.background,
      ...textStyles.bodyText,
      minHeight: 120,
      color: colors.dark,
    },
    textInput: {
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      backgroundColor: colors.background,
      ...textStyles.bodyText,
      height: 48,
      color: colors.dark,
    },
    passwordToggle: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.primaryLight,
      borderRadius: borderRadius.lg,
      alignItems: 'center',
    },
    passwordToggleText: {
      ...textStyles.label,
      color: colors.primary,
      fontWeight: '700',
    },
  });

  const menuItems = [
    {
      id: '1',
      icon: '👤',
      label: 'Éditer Profil',
      onPress: () => setShowProfileModal(true),
    },
    {
      id: '2',
      icon: '🆔',
      label: 'Vérification d\'identité',
      onPress: () => navigation.navigate('Kyc'),
    },
    {
      id: '3',
      icon: '🛍️',
      label: 'Commerçants',
      onPress: () => navigation.navigate('Merchants'),
    },
    {
      id: '4',
      icon: '⚙️',
      label: 'Paramètres',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: '5',
      icon: '💬',
      label: 'Aide & Support',
      onPress: () => setShowHelpModal(true),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowProfileModal(true)}
            style={{ padding: spacing.sm }}
          >
            <Text style={{ fontSize: 20 }}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMPTE</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KYC Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STATUT</Text>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ ...textStyles.label, color: colors.dark, marginBottom: spacing.xs }}>
                  KYC Verification
                </Text>
                <Text style={{ ...textStyles.caption, color: colors.gray }}>
                  {kycStatus
                    ? kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1).toLowerCase()
                    : 'Not Started'}
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>
                {kycStatus === 'APPROVED' ? '✅' : kycStatus === 'PENDING' ? '⏳' : '❌'}
              </Text>
            </View>
          </Card>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Déconnexion</Text>
        </TouchableOpacity>
      </Animated.ScrollView>

      {/* Help & Support Modal */}
      <Modal
        visible={showHelpModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <SafeAreaView style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Aide & Support</Text>
                <View style={{ width: 30 }} />
              </View>

              <Text style={styles.modalLabel}>Décrivez votre problème:</Text>
              <TextInput
                style={styles.helpInput}
                placeholder="Saisissez votre message ici..."
                placeholderTextColor={colors.gray}
                multiline
                numberOfLines={5}
                value={helpMessage}
                onChangeText={setHelpMessage}
                textAlignVertical="top"
              />

              <Button
                title="📨 Envoyer"
                onPress={handleSendHelp}
                fullWidth
                style={{ marginTop: spacing.lg }}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showProfileModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <SafeAreaView style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowProfileModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Éditer Profil</Text>
                <View style={{ width: 30 }} />
              </View>

              <Text style={styles.modalLabel}>Prénom:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Votre prénom"
                placeholderTextColor={colors.gray}
                value={editFirstName}
                onChangeText={setEditFirstName}
              />

              <Text style={[styles.modalLabel, { marginTop: spacing.lg }]}>Nom:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Votre nom"
                placeholderTextColor={colors.gray}
                value={editLastName}
                onChangeText={setEditLastName}
              />

              <Text style={[styles.modalLabel, { marginTop: spacing.lg }]}>Email:</Text>
              <TextInput
                style={[styles.textInput, { color: colors.gray }]}
                placeholder={editEmail}
                value={editEmail}
                editable={false}
              />
              <Text style={{ ...textStyles.caption, color: colors.gray, marginTop: spacing.xs }}>L'email ne peut pas être modifié</Text>

              <TouchableOpacity
                onPress={() => setShowPasswordFields(!showPasswordFields)}
                style={[styles.passwordToggle, { marginTop: spacing.lg }]}
              >
                <Text style={styles.passwordToggleText}>
                  {showPasswordFields ? '🔒 Masquer' : '🔓 Changer le mot de passe'}
                </Text>
              </TouchableOpacity>

              {showPasswordFields && (
                <>
                  <Text style={[styles.modalLabel, { marginTop: spacing.lg }]}>Nouveau mot de passe:</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Minimum 6 caractères"
                    placeholderTextColor={colors.gray}
                    value={editPassword}
                    onChangeText={setEditPassword}
                    secureTextEntry
                  />

                  <Text style={[styles.modalLabel, { marginTop: spacing.lg }]}>Confirmer mot de passe:</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirmer votre mot de passe"
                    placeholderTextColor={colors.gray}
                    value={editPasswordConfirm}
                    onChangeText={setEditPasswordConfirm}
                    secureTextEntry
                  />
                </>
              )}

              <Button
                title="💾 Enregistrer"
                onPress={handleUpdateProfile}
                fullWidth
                style={{ marginTop: spacing.lg }}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default MenuScreen;
