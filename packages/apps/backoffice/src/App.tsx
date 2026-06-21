import { Outlet } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@iziui/react/theme';
import { ToastProvider } from '@iziui/react/Toast';

import { createProvider, defineProvider } from '@eventapp/core/Provider';

import { AuthProvider } from '@eventapp/modules/auth';
import { RolesProvider } from '@eventapp/modules/roles';
import type { UserData } from '@eventapp/modules/user';

import { light } from '@eventapp/common/theme';

import Layout from '@/layout';
import {
  url,
  authServices,
  userServices,
  rolesServices,
} from '@/services/core';

import { UsersProvider } from './pages/Users';

const UIProviders = createProvider([
  defineProvider([ThemeProvider, { theme: createTheme(light) }]),
  defineProvider([ToastProvider]),
]);

const ModuleProviders = createProvider([
  defineProvider([AuthProvider, {
    authServices,
    userServices,
    onAuthenticate: (user?: UserData) => {
      if (user) { return; }

      window.open(url.sso, '_self');
    },
    onLogout: () => { window.open(url.sso, '_self'); }
  }]),
  defineProvider([UsersProvider]),
  defineProvider([RolesProvider, {
    rolesServices
  }])
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
      <ModuleProviders>
        <Content />
      </ModuleProviders>
    </UIProviders>
  );
};