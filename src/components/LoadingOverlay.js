import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { makeStyles, Text, useTheme } from '@rneui/themed';

export default function LoadingOverlay({ label = 'Loading events...' }) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: { alignItems: 'center', backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center' },
  label: { color: theme.colors.textMuted, marginTop: 12 },
}));
