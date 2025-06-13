import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from 'react-native-paper';

export const darkTheme = {
    ...DefaultDarkTheme,
    'colors': {
        ...DefaultDarkTheme.colors,
        'card': DefaultDarkTheme.colors.primaryContainer,
        'border': 'white',
        'text': 'white',
        'notification': 'white',
        'onBackground': 'white',
    },
};
export const lightTheme = {
    ...DefaultLightTheme,
    'colors': {
        ...DefaultLightTheme.colors,
        'card': DefaultLightTheme.colors.primaryContainer,
        'border': 'white',
        'text': 'white',
        'notification': 'white',
        'onBackground': 'white',
    },
};
