import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  label?: string;
}

const getScoreLabel = (score: number): { label: string; color: string } => {
  if (score >= 75) return { label: 'EXCELLENT', color: colors.success };
  if (score >= 60) return { label: 'BON', color: colors.primary };
  if (score >= 50) return { label: 'MOYEN', color: colors.warning };
  if (score >= 30) return { label: 'RISQUE', color: colors.danger };
  return { label: 'REFUSÉ', color: colors.gray };
};

const ScoreBar: React.FC<ScoreBarProps> = ({
  score,
  maxScore = 100,
  label: customLabel,
}) => {
  const { label, color } = getScoreLabel(score);
  const percentage = (score / maxScore) * 100;

  const styles = StyleSheet.create({
    container: {
      marginVertical: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    scoreText: {
      ...textStyles.amountLarge,
      color: color,
    },
    labelText: {
      ...textStyles.micro,
      color: color,
      fontWeight: '600',
    },
    barContainer: {
      height: 12,
      backgroundColor: colors.primaryLight,
      borderRadius: borderRadius.pill,
      overflow: 'hidden',
    },
    bar: {
      height: '100%',
      backgroundColor: color,
      width: `${percentage}%`,
    },
    description: {
      ...textStyles.caption,
      color: colors.gray,
      marginTop: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.labelText}>{customLabel || label}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
      </View>
    </View>
  );
};

export default ScoreBar;
