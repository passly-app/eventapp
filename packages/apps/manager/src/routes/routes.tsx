import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import App from '@/App';
import { APP_NAME } from '@/services/core';

// Home
const HomePage = lazy(() => import('@/pages/Home'));

// My events
const MyEvents = lazy(() => import('@/pages/MyEvents'));

// Create event
const EventStepFormPage = lazy(() => import('@/pages/EventStepForm'));
const EventDatePage = lazy(() => import('@/pages/EventStepForm/pages/EventDate'));
const EventReviewPage = lazy(() => import('@/pages/EventStepForm/pages/EventReview'));
const EventTicketsPage = lazy(() => import('@/pages/EventStepForm/pages/EventTickets'));
const EventLocationPage = lazy(() => import('@/pages/EventStepForm/pages/EventLocation'));
const EventInformationPage = lazy(() => import('@/pages/EventStepForm/pages/EventInformation'));

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
          <MyEvents />
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
        loader: () => document.title = `${APP_NAME} - Criar evento`,
        element: (
          <EventStepFormPage />
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
        path: 'editar-evento/:eventId',
        loader: () => document.title = `${APP_NAME} - Editar evento`,
        element: (
          <EventStepFormPage />
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
