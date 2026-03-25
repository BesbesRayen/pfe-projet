import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { Loader } from '../components';
import { boutiques, categories as allCategories } from '../config/boutiques';

interface MerchantsScreenProps {
  navigation: any;
}

const MerchantsScreen: React.FC<MerchantsScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredBoutiques = useMemo(() => {
    return boutiques.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchText.toLowerCase()) ||
        b.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory === 'Tous' || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory]);

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
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.gray,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.white,
      marginBottom: spacing.lg,
    },
    searchInput: {
      flex: 1,
      ...textStyles.bodyText,
      color: colors.dark,
      paddingVertical: spacing.sm,
    },
    searchIcon: {
      fontSize: 18,
      marginRight: spacing.sm,
    },
    categoryContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
      paddingVertical: spacing.sm,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.pill,
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.white,
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryText: {
      ...textStyles.label,
      color: colors.primary,
      fontSize: 12,
    },
    categoryTextActive: {
      color: colors.white,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    boutiquCard: {
      marginBottom: spacing.md,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: colors.white,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 3,
    },
    boutiqueHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    boutiqueLogo: {
      fontSize: 32,
      marginRight: spacing.md,
    },
    boutiqueInfo: {
      flex: 1,
    },
    boutiqueName: {
      ...textStyles.label,
      color: colors.dark,
      fontWeight: '600',
    },
    boutiqueCategory: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.xs,
    },
    boutiqueDescription: {
      ...textStyles.caption,
      color: colors.dark,
      marginTop: spacing.sm,
      lineHeight: 16,
    },
    boutiqueFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.grayBg,
    },
    boutiqueStats: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    stat: {
      alignItems: 'center',
    },
    statLabel: {
      ...textStyles.micro,
      color: colors.gray,
      marginTop: spacing.xs,
    },
    statValue: {
      ...textStyles.label,
      color: colors.primary,
      fontWeight: '600',
    },
    boutiqueButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.primaryLight,
      borderRadius: borderRadius.sm,
    },
    boutiqueButtonText: {
      ...textStyles.micro,
      color: colors.primary,
      fontWeight: '600',
    },
    emptyText: {
      ...textStyles.bodyText,
      color: colors.gray,
      textAlign: 'center',
      marginTop: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Boutiques Partenaires</Text>
        <Text style={{ ...textStyles.caption, color: colors.gray }}>
          {filteredBoutiques.length} boutique{filteredBoutiques.length !== 1 ? 's' : ''} trouvée
          {filteredBoutiques.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        scrollEventThrottle={16}
      >
        {allCategories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une boutique..."
            placeholderTextColor={colors.gray}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredBoutiques.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune boutique trouvée pour cette recherche.
          </Text>
        ) : (
          filteredBoutiques.map((boutique) => (
            <TouchableOpacity
              key={boutique.id}
              style={styles.boutiquCard}
              onPress={() => {
                // Navigate to simulator or boutique detail screen
                navigation.navigate('MainAppTabs', { screen: 'Simulator' });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.boutiqueHeader}>
                <Text style={styles.boutiqueLogo}>{boutique.logo}</Text>
                <View style={styles.boutiqueInfo}>
                  <Text style={styles.boutiqueName}>{boutique.name}</Text>
                  <Text style={styles.boutiqueCategory}>{boutique.category}</Text>
                </View>
              </View>
              <Text style={styles.boutiqueDescription}>{boutique.description}</Text>
              <View style={styles.boutiqueFooter}>
                <View style={styles.boutiqueStats}>
                  <View style={styles.stat}>
                    <Text style={styles.statValue}>{boutique.locations}</Text>
                    <Text style={styles.statLabel}>Magasins</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statValue}>{boutique.founded}</Text>
                    <Text style={styles.statLabel}>Fondée</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.boutiqueButton} activeOpacity={0.7}>
                  <Text style={styles.boutiqueButtonText}>Voir →</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MerchantsScreen;

