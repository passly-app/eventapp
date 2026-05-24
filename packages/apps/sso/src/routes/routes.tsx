import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import Signin from '@/pages/Signin';
import Signup from '@/pages/Signup';

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <App />
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/signin' />,
      },
      {
        path: '/signin',
        loader: () => document.title = 'Eventapp - Login',
        element: <Signin />,
      },
      {
        path: '/signup',
        loader: () => document.title = 'Eventapp - Criar conta',
        element: <Signup />,
      },
      {
        path: '*',
        element: <Navigate to='/signin' />,
      }
    ]
  },
]);
