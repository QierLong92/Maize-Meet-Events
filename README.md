# MaizeMeet yclmir branch

MaizeMeet is a partially completed campus-events application used for a React Native maintenance assignment. It uses Expo SDK 57, React Navigation, RNEUI, SQLite, AsyncStorage, and SecureStore.

## Run The App

Requirements:

- Node.js 20.19 or newer
- Expo Go or an iOS/Android simulator - web will partially work, but SQLite will not.

```bash
npm install
npm start
```

The dummy login credentials are pre-filled on the login screen.

## Storage

| Data | Storage |
|---|---|
| Session | SecureStore |
| Display preferences | AsyncStorage |
| Events, saved events, registrations, and notes | SQLite |

