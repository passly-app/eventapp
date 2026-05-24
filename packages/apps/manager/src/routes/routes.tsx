import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import App from '@/App';
import { APP_NAME } from '@/services/core';

const HomePage = lazy(() => import('@/pages/Home'));

// Create event
const CreateEventPage = lazy(() => import('@/pages/CreateEvent'));
const EventDatePage = lazy(() => import('@/pages/CreateEvent/pages/EventDate'));
const EventReviewPage = lazy(() => import('@/pages/CreateEvent/pages/EventReview'));
const EventTicketsPage = lazy(() => import('@/pages/CreateEvent/pages/EventTickets'));
const EventLocationPage = lazy(() => import('@/pages/CreateEvent/pages/EventLocation'));
const EventInformationPage = lazy(() => import('@/pages/CreateEvent/pages/EventInformation'));

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <App />
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />,
      },
      {
        path: 'home',
        loader: () => document.title = `${APP_NAME} - Home`,
        element: (
          <HomePage />
        ),
      },
      {
        path: 'meus-eventos',
        loader: () => document.title = `${APP_NAME} - Home`,
        element: (
          <div>meus-eventos</div>
        ),
      },
      {
        path: 'meus-ingressos',
        loader: () => document.title = `${APP_NAME} - Home`,
        element: (
          <div>meus-ingressos</div>
        ),
      },
      {
        path: 'criar-evento',
        loader: () => document.title = `${APP_NAME} - Criar`,
        element: (
          <CreateEventPage />
        ),
        children: [
          { path: 'revisao', element: <EventReviewPage /> },
          { path: 'data-hora', element: <EventDatePage /> },
          { path: 'ingressos', element: <EventTicketsPage /> },
          { path: 'localizacao', element: <EventLocationPage /> },
          { path: 'informacoes-basicas', element: <EventInformationPage /> },
          { path: '', element: <Navigate to='informacoes-basicas' />, }
        ]
      },
      {
        path: '*',
        element: <Navigate to='/home' />,
      }
    ]
  },
]);
