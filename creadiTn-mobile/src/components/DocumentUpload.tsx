import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Card from './Card';
import { colors, spacing, textStyles, borderRadius } from '../theme';

interface DocumentUploadProps {
  label: string;
  onUpload: () => void;
  done: boolean;
  fileName?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  onUpload,
  done,
  fileName,
}) => {
  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderColor: done ? colors.success : colors.gray,
      borderStyle: 'dashed',
      padding: spacing.lg,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    content: {
      alignItems: 'center',
    },
    icon: {
      fontSize: 32,
      marginBottom: spacing.md,
      lineHeight: 36,
    },
    label: {
      ...textStyles.label,
      color: colors.dark,
      marginBottom: spacing.sm,
    },
    text: {
      ...textStyles.caption,
      color: colors.gray,
      textAlign: 'center',
    },
    fileName: {
      ...textStyles.caption,
      color: colors.success,
      marginTop: spacing.md,
      fontWeight: '600',
    },
    doneIcon: {
      fontSize: 24,
      marginRight: spacing.sm,
      lineHeight: 28,
    },
  });

  return (
    <TouchableOpacity onPress={onUpload} activeOpacity={0.7}>
      <Card
        style={styles.card}
        shadow="sm"
        radius={borderRadius.md}
      >
        <View style={styles.content}>
          <Text style={styles.icon}>{done ? '✅' : '📷'}</Text>
          <Text style={styles.label}>{label}</Text>
          {!done && (
            <Text style={styles.text}>
              Choisir ou prendre une photo
            </Text>
          )}
          {done && fileName && (
            <Text style={styles.fileName}>{fileName}</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default DocumentUpload;
