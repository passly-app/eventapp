import { Outlet } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@iziui/react/theme';
import { ToastProvider } from '@iziui/react/Toast';

import { createProvider, defineProvider } from '@eventapp/core/Provider';

import { TranslationProvider } from '@eventapp/resources';

import { AuthProvider } from '@eventapp/modules/auth';
import { RolesProvider } from '@eventapp/modules/roles';
import { EventProvider } from '@eventapp/modules/event';
import { UserProvider, type UserData } from '@eventapp/modules/user';

import { light } from '@eventapp/common/theme';

import {
  url,
  authServices,
  userServices,
  rolesServices,
  eventServices,
} from '@/services/core';

import Layout from './layout';
import { locales } from './locales';

const UIProviders = createProvider([
  defineProvider([ThemeProvider, { theme: createTheme(light) }]),
  defineProvider([ToastProvider]),
]);

const Providers = createProvider([
  defineProvider([AuthProvider, {
    authServices,
    userServices,
    onAuthenticate: (user?: UserData) => {
      if (user) { return; }

      window.open(url.sso, '_self');
    },
    onLogout: () => { window.open(url.sso, '_self'); }
  }]),
  defineProvider([UserProvider]),
  defineProvider([RolesProvider, { rolesServices }]),
  defineProvider([EventProvider, { eventServices }])
]);

function Content() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <UIProviders>
      <TranslationProvider locales={locales}>
        <Providers>
          <Content />
        </Providers>
      </TranslationProvider>
    </UIProviders>
  );
};