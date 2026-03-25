import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Card, Button, DocumentUpload, Input, Loader } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { uploadKycMultipart } from '../api/kyc';

interface KycScreenProps {
  navigation: any;
}

const KycScreen: React.FC<KycScreenProps> = ({ navigation }) => {
  const { userId, updateKycStatus } = useAuth();
  const [step, setStep] = useState(1);
  const [cinNumber, setCinNumber] = useState<string>('');
  const [cinFrontUri, setCinFrontUri] = useState<string | null>(null);
  const [cinBackUri, setCinBackUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      console.log('[KYC] Requesting media permissions...');
      try {
        // Request both permissions upfront
        const [libPerm, camPerm] = await Promise.all([
          ImagePicker.requestMediaLibraryPermissionsAsync(),
          ImagePicker.requestCameraPermissionsAsync(),
        ]);
        
        console.log('[KYC] Library permission:', libPerm.status);
        console.log('[KYC] Camera permission:', camPerm.status);
        
        // Don't show alerts - let app work if either is granted
        if (libPerm.status !== 'granted') {
          console.warn('[KYC] Gallery permission denied');
        }
        if (camPerm.status !== 'granted') {
          console.warn('[KYC] Camera permission denied');
        }
      } catch (error) {
        console.error('[KYC] Permission request error:', error);
      }
    })();
  }, []);

  const pickCinSide = useCallback(async (side: 'front' | 'back') => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });
    if (res.canceled || !res.assets?.[0]?.uri) return;
    const uri = res.assets[0].uri;
    if (side === 'front') setCinFrontUri(uri);
    else setCinBackUri(uri);
  }, []);

  const pickSelfie = useCallback(async () => {
    try {
      console.log('[KYC] pickSelfie called');
      
      // Request camera permission explicitly before attempting to use camera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('[KYC] Camera permission result:', status);
      
      if (status !== 'granted') {
        console.warn('[KYC] Camera permission still not granted after request');
        // Offer user multiple options for fixing permission issue
        Alert.alert(
          '📱 Permissions Requises',
          'CreadiTN a besoin d\'accès à la caméra pour capturer votre selfie.\n\nComment corriger:\n\n1. Allez aux paramètres de l\'app\n2. Cherchez "Caméra"\n3. Sélectionnez "Toujours autoriser"',
          [
            { 
              text: 'Réessayer', 
              onPress: () => pickSelfie() // Retry recursively
            },
            { 
              text: 'Paramètres',
              onPress: () => {
                console.log('[KYC] Opening app settings');
                Linking.openSettings().catch(() => {
                  console.error('[KYC] Could not open settings');
                });
              }
            },
            { text: 'Plus tard', style: 'cancel' },
          ]
        );
        return;
      }
      
      console.log('[KYC] Launching camera...');
      const res = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.95,
        aspect: [1, 1],
        mediaTypes: ['images'],
        exif: true,
      });

      if (!res.canceled && res.assets?.[0]?.uri) {
        console.log('[KYC] Selfie captured successfully:', res.assets[0].uri);
        setSelfieUri(res.assets[0].uri);
        Alert.alert('✅ Succès', 'Votre selfie a été capturée avec succès!');
      } else {
        console.log('[KYC] Camera canceled by user');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('[KYC] Camera error:', errorMsg);
      
      // Distinguish different types of camera errors
      let errorTitle = '⚠️ Erreur Caméra';
      let errorDescription = '';
      
      if (errorMsg.includes('permission') || errorMsg.toLowerCase().includes('denied')) {
        errorTitle = '📱 Accès Caméra Refusé';
        errorDescription = 'Les permissions de caméra ne sont pas accordées.\n\nVous devez aller à:\nParamètres → CreadiTN → Caméra → Autoriser';
      } else if (errorMsg.includes('not available') || errorMsg.includes('device')) {
        errorTitle = '📷 Caméra Non Disponible';
        errorDescription = 'Votre appareil n\'a pas de caméra ou elle n\'est pas disponible.';
      } else {
        errorDescription = `Erreur technique: ${errorMsg}\n\nVérifiez que vous avez autorisé l\'accès à la caméra.`;
      }
      
      Alert.alert(errorTitle, errorDescription, [
        { text: 'OK', style: 'default' },
      ]);
    }
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Session', 'Veuillez vous reconnecter.');
      return;
    }
    if (!cinNumber || cinNumber.trim().length === 0) {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro CIN.');
      return;
    }
    if (!cinFrontUri || !cinBackUri || !selfieUri) {
      Alert.alert('Erreur', 'Veuillez ajouter recto, verso et selfie.');
      return;
    }
    setSubmitting(true);
    try {
      const doc = await uploadKycMultipart(userId, cinNumber, {
        cinFront: { uri: cinFrontUri, name: 'cin_front.jpg', type: 'image/jpeg' },
        cinBack: { uri: cinBackUri, name: 'cin_back.jpg', type: 'image/jpeg' },
        selfie: { uri: selfieUri, name: 'selfie.jpg', type: 'image/jpeg' },
      });
      updateKycStatus(doc.status);
      navigation.navigate('KycStatus');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Échec envoi KYC';
      Alert.alert('Erreur', msg);
    } finally {
      setSubmitting(false);
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
    progressBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    progressDot: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressDotActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    progressDotComplete: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    progressDotInactive: {
      backgroundColor: colors.background,
      borderColor: colors.gray,
    },
    progressDotText: {
      ...textStyles.label,
      fontWeight: '700',
    },
    progressLine: {
      flex: 1,
      height: 2,
      backgroundColor: step === 2 ? colors.success : colors.gray,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...textStyles.cardTitle,
      color: colors.dark,
      marginBottom: spacing.md,
    },
    instruction: {
      ...textStyles.bodyText,
      color: colors.gray,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
  });

  if (submitting) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader fullScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vérification d'identité (KYC)</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressDot, step >= 1 ? styles.progressDotActive : styles.progressDotInactive]}>
            <Text style={[styles.progressDotText, { color: step >= 1 ? colors.white : colors.gray }]}>1</Text>
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressDot,
              step === 2 ? styles.progressDotActive : step > 2 ? styles.progressDotComplete : styles.progressDotInactive,
            ]}
          >
            <Text style={[styles.progressDotText, { color: step >= 2 ? colors.white : colors.gray }]}>2</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Télécharger votre CIN</Text>
              <Text style={styles.instruction}>Recto et verso de votre carte d'identité</Text>

              <DocumentUpload
                label="CIN Recto"
                onUpload={() => void pickCinSide('front')}
                done={!!cinFrontUri}
                fileName={cinFrontUri ? 'cin_recto.jpg' : undefined}
              />

              <DocumentUpload
                label="CIN Verso"
                onUpload={() => void pickCinSide('back')}
                done={!!cinBackUri}
                fileName={cinBackUri ? 'cin_verso.jpg' : undefined}
              />

              <Button
                title="Suivant →"
                onPress={() => setStep(2)}
                disabled={!cinFrontUri || !cinBackUri}
                fullWidth
                style={{ marginTop: spacing.lg }}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vos Informations</Text>
              <Input
                placeholder="Entrez votre numéro CIN (ex: 00123456)"
                value={cinNumber}
                onChangeText={setCinNumber}
                style={{ marginBottom: spacing.lg }}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prendre une Selfie</Text>
              <Text style={styles.instruction}>Tenez votre CIN visible sur la photo</Text>

              <Card
                style={{
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderColor: colors.primary,
                  padding: spacing.xl,
                  alignItems: 'center',
                  backgroundColor: colors.primaryLight + '20',
                  borderRadius: borderRadius.xl,
                }}
                shadow="sm"
              >
                <Text style={{ fontSize: 56, marginBottom: spacing.lg, lineHeight: 64 }}>📸</Text>
                <Text style={{ ...textStyles.cardTitle, marginBottom: spacing.sm, textAlign: 'center', color: colors.dark }}>
                  {selfieUri ? '✅ Selfie Capturée' : 'Prenez une Selfie'}
                </Text>
                <Text style={{ ...textStyles.bodyText, textAlign: 'center', marginBottom: spacing.lg, color: colors.gray }}>
                  {selfieUri ? 'Votre photo a été capturée avec succès' : 'Appuyez sur le bouton pour acceder à la caméra'}
                </Text>

                {!selfieUri ? (
                  <Button 
                    title="📱 Ouvrir la caméra" 
                    onPress={() => pickSelfie()}
                    fullWidth 
                    size="lg"
                  />
                ) : (
                  <>
                    <View style={{ width: '100%', gap: spacing.md }}>
                      <Button
                        title="🔄 Prendre une autre photo"
                        onPress={() => pickSelfie()}
                        variant="secondary"
                        fullWidth
                      />
                    </View>
                  </>
                )}
              </Card>

              <Button
                title="✅ Soumettre le KYC"
                onPress={() => handleSubmit()}
                disabled={!selfieUri}
                style={{ marginTop: spacing.xl }}
                fullWidth
              />

              <Button 
                title="← Retour" 
                onPress={() => setStep(1)} 
                variant="ghost" 
                style={{ marginTop: spacing.md }} 
                fullWidth 
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default KycScreen;
