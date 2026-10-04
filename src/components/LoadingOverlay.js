import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { colors } from '../theme/theme';

export default function LoadingOverlay({ label = 'Loading events...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.blue} size="large" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  label: { color: colors.muted, marginTop: 12 },
});
