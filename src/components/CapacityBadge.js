import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';

export default function CapacityBadge({ capacity, registeredCount = 0 }) {
  const label = capacity === null ? 'Drop-in event' : `${registeredCount} / ${capacity}`;

  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4ECF5',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: { color: '#23313D', fontSize: 12, fontWeight: '700' },
});
