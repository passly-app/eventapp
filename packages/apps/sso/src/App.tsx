import { Outlet } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@iziui/react/theme';
import { ToastProvider } from '@iziui/react/Toast';

import { createProvider, defineProvider } from '@eventapp/core/Provider';

import { AuthProvider } from '@eventapp/modules/auth';

import { authServices, userServices } from './services/core';

function Content() {
  return (
    <Outlet />
  );
}

const UIProviders = createProvider([
  defineProvider([ThemeProvider, { theme: createTheme() }]),
  defineProvider([ToastProvider]),
]);

const Providers = createProvider([
  defineProvider([AuthProvider, {
    authServices,
    userServices,
  }])
]);

export default function App() {
  return (
    <UIProviders>
      <Providers>
        <Content />
      </Providers>
    </UIProviders>
  );
};