import { createContext, useMemo, useState, type PropsWithChildren } from 'react';

import { useToast } from '@iziui/react/Toast';

import logger from '@eventapp/toolkit/logger';

import type { Event } from '../interface';
import { EventServices } from '../services';

export interface EventContextConfig {
  myEvents: Event[];
  getMyEvents: (userId: string) => Promise<void>;
  createEvent: (data: Omit<Event, 'id'>) => Promise<void>;
}

export const EventContext = createContext<EventContextConfig>({
  myEvents: [],
  getMyEvents: () => Promise.resolve(),
  createEvent: () => Promise.resolve(),
});

export default function EventProvider({ eventServices, children }: PropsWithChildren<{
  eventServices: EventServices
}>) {
  const { addToast } = useToast();

  const [myEvents, setMyEvents] = useState<Event[]>([]);

  const context = useMemo<EventContextConfig>(() => ({
    myEvents,
    getMyEvents: (userId) => getMyEvents(userId),
    createEvent: (data) => createEvent(data),
  }), [myEvents]);

  const getMyEvents = async (userId: string) => {
    return;
  };

  const createEvent = async (data: Omit<Event, 'id'>) => {
    return eventServices.create(data)
      .then((newEvent) => {
        addToast({ message: 'Evento criado!', color: 'success' });
        setMyEvents(prev => ([...prev, newEvent]));
      })
      .catch((e) => {
        addToast({ message: 'Deu erro!', color: 'error' });
        logger.error('Erro na criação do serviço', e);
      });
  };

  return (
    <EventContext.Provider value={context}>
      {children}
    </EventContext.Provider>
  );
}