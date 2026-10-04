import { createTheme } from '@rneui/themed';

export const colors = {
  maize: '#FFCB05',
  blue: '#00274C',
  blueLight: '#33597D',
  cream: '#F7F4ED',
  ink: '#17212B',
  muted: '#66717C',
  border: '#DCE2E7',
  danger: '#B42318',
};

export const appTheme = createTheme({
  lightColors: {
    primary: colors.blue,
    secondary: colors.maize,
    background: colors.cream,
    white: '#FFFFFF',
    black: colors.ink,
    grey0: colors.ink,
    grey3: colors.muted,
    grey5: colors.border,
  },
  darkColors: {
    primary: colors.maize,
    secondary: colors.blueLight,
    background: '#101820',
    white: '#17212B',
    black: '#F7F4ED',
    grey0: '#F7F4ED',
    grey3: '#66717C',
    grey5: '#253443',
  },
  mode: 'light',
  components: {
    Button: {
      radius: 10,
      titleStyle: { fontWeight: '700' },
    },
    Card: {
      containerStyle: {
        borderRadius: 16,
        borderWidth: 0,
        margin: 0,
      },
    },
  },
});
