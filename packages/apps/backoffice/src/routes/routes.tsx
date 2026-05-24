import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import App from '@/App';

const RolesPage = lazy(() => import('@/pages/Roles'));
const UsersPage = lazy(() => import('@/pages/Users'));

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <App />
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/users' />,
      },
      {
        path: '/users',
        loader: () => document.title = 'Clube do afiliado - Usuários',
        element: (
          <UsersPage />
        ),
      },
      {
        path: '/roles',
        loader: () => document.title = 'Clube do afiliado - Permissões',
        element: (
          <RolesPage />
        ),
      },
      {
        path: '*',
        element: <Navigate to='/users' />,
      }
    ],
  }
]);
