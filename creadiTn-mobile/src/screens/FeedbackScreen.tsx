import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../components';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface FeedbackScreenProps {
  navigation: any;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || !feedback.trim()) {
      Alert.alert('Erreur', 'Veuillez donner une note et un commentaire');
      return;
    }
    Alert.alert('Merci!', 'Votre avis a été enregistré');
    setRating(0);
    setFeedback('');
  };

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
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    star: {
      fontSize: 32,
      padding: spacing.md,
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      minHeight: 120,
      color: colors.dark,
      fontSize: 16,
      lineHeight: 22,
      textAlignVertical: 'top',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Donner votre avis</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Notez votre expérience</Text>
          <Card>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={[
                    styles.star,
                    { opacity: rating >= star ? 1 : 0.3 },
                  ]}
                  onPress={() => setRating(star)}
                >
                  ⭐
                </Text>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Vos commentaires</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Décrivez votre expérience..."
            placeholderTextColor={colors.muted}
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>

        <Button
          title="Envoyer l'avis"
          onPress={handleSubmit}
          size="lg"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
