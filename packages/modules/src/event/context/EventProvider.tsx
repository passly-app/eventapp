import { createContext, useMemo, useState, type PropsWithChildren } from 'react';

import { useToast } from '@iziui/react/Toast';

import logger from '@eventapp/toolkit/logger';

import type { Event, SaveDraftAssing } from '../interface';
import { EventServices } from '../services';

type ToDraft = Partial<Event> & Pick<Event, 'name' | 'schedule' | 'id'>;

export interface EventContextConfig {
  myEvents: Event[];
  eventDetails?: Event;

  getMyEvents: (userId: string) => Promise<void>;
  getEventDetails: (eventId: string) => Promise<Event | undefined>;

  saveDraft: (data: ToDraft) => Promise<SaveDraftAssing>;

  copyEvent: (data: Event) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  createEvent: (data: Omit<Event, 'id'>) => Promise<void>;
}

export const EventContext = createContext<EventContextConfig>({
  myEvents: [],
  eventDetails: undefined,

  getMyEvents: () => Promise.resolve(),
  getEventDetails: () => Promise.resolve({} as Event),

  copyEvent: () => Promise.resolve(),
  saveDraft: () => Promise.resolve({} as SaveDraftAssing),

  createEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
  updateEvent: () => Promise.resolve(),
});

export default function EventProvider({ eventServices, children }: PropsWithChildren<{
  eventServices: EventServices
}>) {
  const { addToast } = useToast();

  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [eventDetails, setEventDetails] = useState<Event>();

  const context = useMemo<EventContextConfig>(() => ({
    myEvents,
    eventDetails,

    getMyEvents: (userId) => getMyEvents(userId),
    getEventDetails: (userId) => getEventDetails(userId),

    copyEvent: (event) => copyEvent(event),
    saveDraft: (data) => saveDraft(data),

    createEvent: (data) => createEvent(data),
    deleteEvent: (eventId) => deleteEvent(eventId),
    updateEvent: (event) => updateEvent(event),
  }), [myEvents, eventDetails]);

  const getMyEvents = async (userId: string) => {
    return eventServices.getEvents(userId)
      .then(events => setMyEvents(events));
  };

  const saveDraft = async (data: ToDraft) => {
    return eventServices.saveDraft(data)
      .then((newEvent) => {
        addToast({ message: 'Rascunho salvo!', color: 'success' });
        return newEvent;
      });
  };

  const createEvent = async (data: Omit<Event, 'id'>) => {
    return eventServices.create(data)
      .then((newEvent) => {
        addToast({ message: 'Evento criado!', color: 'success' });
        setMyEvents(prev => ([...prev, newEvent]));
      })
      .catch((e) => {
        addToast({ message: 'Deu erro!', color: 'error' });
        logger.error('Não foi possível criar o evento', e);
      });
  };

  const getEventDetails = async (eventId: string) => {
    return eventServices.getDetails(eventId)
      .then(event => {
        if (!event) { return; };
        setEventDetails(event);
        return event;
      });
  };

  const deleteEvent = async (eventId: string) => {
    return eventServices.deleteEvent(eventId)
      .then(() => setMyEvents(prev => prev.filter(e => e.id !== eventId)));
  };

  const copyEvent = async (data: Event) => {
    return eventServices.copy(data)
      .then((newEvent) => {
        addToast({ message: 'Evento copiado!', color: 'success' });
        setMyEvents(prev => ([...prev, newEvent]));
      })
      .catch((e) => {
        addToast({ message: 'Deu erro!', color: 'error' });
        logger.error('Não foi possível copiar o evento', e);
      });
  };

  const updateEvent = async (event: Event) => {
    return eventServices.update(event)
      .then(() => setMyEvents(prev => {
        return prev.map((e) => {
          return e.id === event.id ? event : e;
        });
      }));
  };

  return (
    <EventContext.Provider value={context}>
      {children}
    </EventContext.Provider>
  );
}