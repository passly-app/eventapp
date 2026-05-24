import type { Theme } from '@iziui/react/theme';

export const light: Theme = {
  mode: 'light',
  palette: {
    info: '#72E4FC',
    error: '#FF5377',
    warning: '#FF9457',
    success: '#36E79B',
    primary: '#FC4BA0',
    secondary: '#642CF9',
    grey: '#545f6f',
    text: {
      primary: 'rgb(31, 41, 55)',
      secondary: 'rgb(75, 85, 99)',
      disabled: 'rgb(172, 172, 172)'
    },
    background: {
      paper: '#FCFAF5',
      default: '#FFF',
    },
    divider: 'rgba(0, 0, 0, 0.12)'
  },
  spacing: 8,
  shape: {
    radius: 8
  },
  typography: {
    family: 'Poppins',
    // eslint-disable-next-line
    url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'
  }
};