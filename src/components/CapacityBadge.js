import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from '@rneui/themed';

export default function CapacityBadge({ capacity, registeredCount = 0 }) {
  const styles = useStyles();
  const label = capacity === null ? 'Drop-in event' : `${registeredCount} / ${capacity}`;

  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: { color: theme.colors.text, fontSize: 12, fontWeight: '700' },
}));
