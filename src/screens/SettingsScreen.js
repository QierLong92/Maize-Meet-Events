import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListItem, makeStyles, Switch, Text, useTheme } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { clearSession } from '../services/session';
import { resetPreferences, setDarkTheme } from '../storage/preferences';
import { colors } from '../theme/theme';

function SettingRow({ icon, title, description, value, onChange }) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <ListItem containerStyle={styles.row}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons color={theme.colors.primary} name={icon} size={22} />
      </View>
      <ListItem.Content>
        <ListItem.Title style={styles.rowTitle}>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.rowDescription}>{description}</ListItem.Subtitle>
      </ListItem.Content>
      <Switch onValueChange={onChange} value={value} />
    </ListItem>
  );
}

export default function SettingsScreen({ navigation }) {
  const { preferences, setPreferences, session, setSession } = useAppContext();
  const [message, setMessage] = useState('');
  const styles = useStyles();

  function changeDarkTheme(value) {
    setPreferences((current) => ({ ...current, darkTheme: value }));
    setDarkTheme(value).catch(() => setMessage('Could not save your preference.'));
  }

  function handleReset() {
    Alert.alert(
      'Reset app data?',
      'This will clear your local MaizeMeet data and sign you out.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetPreferences();
            setPreferences({ darkTheme: false });
            setMessage('App data reset.');
          },
        },
      ]
    );
  }

  async function handleLogout() {
    await clearSession();
    setSession(null);
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text h2 h2Style={styles.heading}>Settings</Text>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{session?.username?.slice(0, 1).toUpperCase() || 'M'}</Text>
          </View>
          <View>
            <Text style={styles.profileName}>{session?.username || 'MaizeMeet user'}</Text>
            <Text style={styles.profileLabel}>Campus account</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>DISPLAY</Text>
        <View style={styles.group}>
          <SettingRow
            description="Use a darker color palette"
            icon="weather-night"
            onChange={changeDarkTheme}
            title="Dark theme"
            value={preferences.darkTheme}
          />
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT & DATA</Text>
        <Button
          buttonStyle={styles.secondaryButton}
          onPress={handleReset}
          title="Reset app data"
          titleStyle={styles.secondaryButtonText}
          type="outline"
        />
        <Button
          buttonStyle={styles.logoutButton}
          onPress={handleLogout}
          title="Sign out"
          titleStyle={styles.logoutText}
          type="clear"
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Text style={styles.version}>MaizeMeet · Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  safeArea: { backgroundColor: theme.colors.background, flex: 1 },
  content: { padding: 20 },
  heading: { color: theme.colors.primary, fontSize: 30, fontWeight: '900', letterSpacing: -0.5 },
  profile: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: 16, flexDirection: 'row', marginTop: 18, padding: 17 },
  avatar: { alignItems: 'center', backgroundColor: colors.maize, borderRadius: 24, height: 48, justifyContent: 'center', marginRight: 13, width: 48 },
  avatarText: { color: colors.blue, fontSize: 20, fontWeight: '900' },
  profileName: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  profileLabel: { color: theme.colors.textMuted, fontSize: 13, marginTop: 2 },
  sectionLabel: { color: theme.colors.textAccent, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, marginTop: 25 },
  group: { borderRadius: 14, overflow: 'hidden' },
  row: { backgroundColor: theme.colors.surface, minHeight: 78, paddingHorizontal: 15 },
  iconBox: { alignItems: 'center', backgroundColor: theme.colors.surfaceMuted, borderRadius: 9, height: 38, justifyContent: 'center', width: 38 },
  rowTitle: { color: theme.colors.text, fontSize: 15, fontWeight: '700' },
  rowDescription: { color: theme.colors.textMuted, fontSize: 12, marginTop: 3 },
  divider: { backgroundColor: theme.colors.outline, height: 1, marginLeft: 68 },
  secondaryButton: { borderColor: theme.colors.primary, borderRadius: 10, marginTop: 2 },
  secondaryButtonText: { color: theme.colors.primary },
  logoutButton: { marginTop: 10 },
  logoutText: { color: theme.colors.danger },
  message: { color: theme.colors.textAccent, marginTop: 10, textAlign: 'center' },
  version: { color: theme.colors.textMuted, fontSize: 12, marginTop: 28, textAlign: 'center' },
}));
