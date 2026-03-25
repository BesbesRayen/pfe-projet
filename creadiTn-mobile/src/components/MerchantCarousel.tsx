import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Animated,
  Alert,
} from 'react-native';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface Merchant {
  id: string;
  name: string;
  icon: string;
  tag: string;
  url?: string;
  category?: string;
}

interface MerchantCarouselProps {
  merchants?: Merchant[];
}

const defaultMerchants: Merchant[] = [
  { id: '1', name: 'Fashion Hub', icon: '👗', tag: 'Popular', url: 'https://www.fashionhub.tn', category: 'Fashion' },
  { id: '2', name: 'Tech Store', icon: '💻', tag: 'New', url: 'https://www.techstore.tn', category: 'Électronique' },
  { id: '3', name: 'Food Delivery', icon: '🍕', tag: 'Popular', url: 'https://www.glovo.tn', category: 'Alimentation' },
  { id: '4', name: 'Beauty Shop', icon: '💄', tag: 'Featured', url: 'https://www.beautyshop.tn', category: 'Beauté' },
  { id: '5', name: 'Sports Gear', icon: '⚽', tag: 'New', url: 'https://www.sportsgear.tn', category: 'Sports' },
  { id: '6', name: 'Home Decor', icon: '🏠', tag: 'Popular', url: 'https://www.homedecor.tn', category: 'Maison' },
  { id: '7', name: 'Book Store', icon: '📚', tag: 'Featured', url: 'https://www.bookstore.tn', category: 'Livres' },
  { id: '8', name: 'Gaming Zone', icon: '🎮', tag: 'New', url: 'https://www.gamingzone.tn', category: 'Gaming' },
];

const MerchantCarousel: React.FC<MerchantCarouselProps> = ({ merchants = defaultMerchants }) => {
  const [scaleValues] = useState(
    merchants.map(() => new Animated.Value(1))
  );

  const handleMerchantPress = (merchant: Merchant, index: number) => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleValues[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (!merchant.url) {
      Alert.alert(
        'ℹ️ Lien Indisponible',
        'Ce partenaire n\'a pas encore de lien disponible.\n\nVeuillez réessayer plus tard ou consulter notre support.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    const url = merchant.url;
    console.log(`[Merchant] Opening ${merchant.name}: ${url}`);
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.warn(`[Merchant] Cannot open URL: ${url}`);
          Alert.alert(
            '❌ Impossible d\'ouvrir',
            `Le navigateur n'a pas pu ouvrir le lien de ${merchant.name}.\n\nURL: ${url}`,
            [{ text: 'OK', style: 'default' }]
          );
          return;
        }
        return Linking.openURL(url);
      })
      .then(() => {
        console.log(`[Merchant] Successfully opened ${merchant.name}`);
      })
      .catch((error) => {
        console.error(`[Merchant] Failed to open ${url}:`, error);
        Alert.alert(
          '⚠️ Erreur',
          `Impossible d'ouvrir le lien de ${merchant.name}.\n\nVeuillez réessayer ou contacter le support.`,
          [
            { text: 'Réessayer', onPress: () => handleMerchantPress(merchant, index) },
            { text: 'Annuler', style: 'cancel' }
          ]
        );
      });
  };

  const styles = StyleSheet.create({
    container: {
      height: 160,
      marginBottom: spacing.xl,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    merchantCard: {
      width: 150,
      marginRight: spacing.md,
      backgroundColor: colors.white,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 5,
    },
    merchantCardActive: {
      borderColor: colors.primary,
      borderWidth: 2,
      backgroundColor: colors.primaryLight,
    },
    icon: {
      fontSize: 56,
      marginBottom: spacing.md,
      lineHeight: 64,
    },
    name: {
      ...textStyles.label,
      color: colors.dark,
      textAlign: 'center',
      marginBottom: spacing.xs,
      fontWeight: '700',
      fontSize: 14,
    },
    tag: {
      ...textStyles.caption,
      backgroundColor: colors.primaryLight,
      color: colors.primary,
      paddingHorizontal: spacing.sm,
      paddingVertical: 3,
      borderRadius: borderRadius.pill,
      overflow: 'hidden',
      fontWeight: '600',
      marginBottom: spacing.md,
      fontSize: 11,
    },
    purchaseButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center',
      width: '100%',
    },
    purchaseButtonText: {
      ...textStyles.label,
      color: colors.white,
      fontWeight: '700',
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        {merchants.map((merchant, index) => (
          <Animated.View
            key={merchant.id}
            style={{
              transform: [{ scale: scaleValues[index] }],
            }}
          >
            <TouchableOpacity
              style={styles.merchantCard}
              activeOpacity={0.8}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Text style={styles.icon}>{merchant.icon}</Text>
              <Text style={styles.name}>{merchant.name}</Text>
              <Text style={styles.tag}>{merchant.tag}</Text>
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => handleMerchantPress(merchant, index)}
                activeOpacity={0.7}
              >
                <Text style={styles.purchaseButtonText}>🛍️ Acheter</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MerchantCarousel;
