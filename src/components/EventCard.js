import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Card, makeStyles, Text, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatEventDate, formatEventTime } from '../utils/date';

export default function EventCard({ event, initiallySaved, onPress, onToggleSaved }) {
  const [saved, setSaved] = useState(initiallySaved);
  const styles = useStyles();
  const { theme } = useTheme();

  async function handleSavedPress() {
    setSaved((current) => !current);
    const next = await onToggleSaved(event.id);
    setSaved(next);
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card containerStyle={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Pressable hitSlop={4} onPress={handleSavedPress} style={styles.heartButton}>
            <MaterialCommunityIcons
              color={saved ? '#C6253D' : theme.colors.textMuted}
              name={saved ? 'heart' : 'heart-outline'}
              size={22}
            />
          </Pressable>
        </View>
        <Text h4 h4Style={styles.title}>
          {event.title}
        </Text>
        <Text style={styles.date}>{formatEventDate(event.startsAt)}</Text>
        <Text numberOfLines={1} style={styles.meta}>
          {formatEventTime(event.startsAt, event.endsAt)} · {event.location}
        </Text>
      </Card>
    </Pressable>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    elevation: 1,
    minHeight: 174,
    padding: 18,
    shadowColor: '#102B44',
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  pressed: { opacity: 0.78 },
  topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  category: { color: theme.colors.textAccent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  heartButton: { alignItems: 'center', height: 28, justifyContent: 'center', width: 28 },
  title: { color: theme.colors.text, fontSize: 20, fontWeight: '800', marginTop: 2 },
  date: { color: theme.colors.primary, fontSize: 14, fontWeight: '700', marginTop: 8 },
  meta: { color: theme.colors.textMuted, fontSize: 13, marginTop: 3 },
}));
