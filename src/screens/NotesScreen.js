import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getNote, saveNote } from '../db/database';

export default function NotesScreen({ navigation, route }) {
  const { eventId, eventTitle } = route.params;
  const [note, setNote] = useState('');
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);
  const latestNote = useRef('');
  const loadedRef = useRef(false);
  const savedBeforeExit = useRef(false);
  const styles = useStyles();
  const { theme } = useTheme();

  useEffect(() => {
    getNote(eventId)
      .then((stored) => {
        const storedNote = stored?.body || '';
        latestNote.current = storedNote;
        setNote(storedNote);
      })
      .finally(() => {
        loadedRef.current = true;
        setLoaded(true);
      });
  }, [eventId]);

  useEffect(() => {
    if (!loaded) return;
    timer.current = setTimeout(() => {
      saveNote(eventId, note)
        .catch(() => {});
    }, 700);
    return () => clearTimeout(timer.current);
  }, [note]);

  useEffect(() => () => {
    clearTimeout(timer.current);
    if (loadedRef.current && !savedBeforeExit.current) {
      saveNote(eventId, latestNote.current).catch(() => {});
    }
  }, [eventId]);

  function handleNoteChange(value) {
    latestNote.current = value;
    savedBeforeExit.current = false;
    setNote(value);
  }

  async function handleBack() {
    clearTimeout(timer.current);
    if (loadedRef.current) {
      try {
        await saveNote(eventId, latestNote.current);
        savedBeforeExit.current = true;
      } catch {}
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons color={theme.colors.primary} name="arrow-left" size={25} />
          </Pressable>
          <Text style={styles.headerTitle}>Private note</Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>NOTE FOR</Text>
          <Text h3 h3Style={styles.eventTitle}>{eventTitle}</Text>
          <Text style={styles.helper}>Only you can see this note.</Text>

          <TextInput
            multiline
            onChangeText={handleNoteChange}
            placeholder="What do you want to remember about this event?"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            textAlignVertical="top"
            value={note}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  safeArea: { backgroundColor: theme.colors.background, flex: 1 },
  flex: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 7 },
  backButton: { alignItems: 'center', height: 38, justifyContent: 'center', width: 38 },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  content: { flex: 1, paddingHorizontal: 22, paddingTop: 28 },
  eyebrow: { color: theme.colors.textAccent, fontSize: 11, fontWeight: '800', letterSpacing: 1.3 },
  eventTitle: { color: theme.colors.primary, fontSize: 25, fontWeight: '900', lineHeight: 30, marginTop: 6 },
  helper: { color: theme.colors.textMuted, marginTop: 8 },
  input: { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline, borderRadius: 14, borderWidth: 1, color: theme.colors.text, flex: 1, fontSize: 16, lineHeight: 24, marginTop: 22, maxHeight: 330, minHeight: 180, padding: 16 },
}));
