import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles, Text, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmptyState({ title, message, actionLabel, onAction }) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons color={theme.colors.textAccent} name="calendar-blank-outline" size={42} />
      <Text h4 style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && <Button onPress={onAction} title={actionLabel} type="clear" />}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 72 },
  title: { color: theme.colors.text, fontWeight: '800', marginTop: 14 },
  message: { color: theme.colors.textMuted, lineHeight: 21, marginBottom: 8, marginTop: 8, textAlign: 'center' },
}));
