import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'maizemeet.session';

export async function createSession(username) {
  const session = {
    token: `demo-${Date.now()}`,
    username,
  };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function restoreSession() {
  const stored = await AsyncStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function canUseSecureStorage() {
  return SecureStore.isAvailableAsync();
}
