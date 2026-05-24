import type { Theme } from '@iziui/react/theme';

export const dark: Theme = {
  mode: 'dark',
  palette: {
    info: '#72E4FC',
    error: '#FF5377',
    warning: '#FF9457',
    success: '#36E79B',
    primary: '#4cbb82',
    secondary: '#FB7185',
    grey: '#F4F4F4',
    text: {
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(232, 232, 232)',
      disabled: 'rgb(172, 172, 172)'
    },
    background: {
      paper: '#1D1F1F',
      default: '#161717',
    },
    divider: 'rgba(255, 255, 255, 0.12)'
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