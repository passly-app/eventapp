import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FormGroup } from '@iziui/react/lab/Form';
import { useToast } from '@iziui/react/Toast';
import Icon from '@iziui/react/Icon';

import { toEnum } from '@eventapp/toolkit/enum';
import { formatDate } from '@eventapp/toolkit/date';
import { urlToFile, getExtension } from '@eventapp/toolkit/file';

import { useAuth } from '@eventapp/modules/auth';
import { Category, type Event, Subject, useEvent } from '@eventapp/modules/event';

import { eventServices, storage } from '@/services/core';

import type { EventForm } from './interface';
import { createEventForm } from './createEventForm';

interface EventFormContextConfig {
  loading: boolean;
  eventDetails?: Event;
  formGroup: FormGroup<Partial<EventForm>>;

  saveDraft: () => Promise<void>;
}

export const EventFormContext = createContext<EventFormContextConfig>({
  loading: false,
  eventDetails: undefined,
  formGroup: new FormGroup({}, {}),
  saveDraft: () => Promise.resolve(),
});

function getFallbackDate(date?: string, time?: string) {
  return {
    date: date ??
      formatDate(new Date(), {
        locale: 'sv-SE',
        options: { year: 'numeric', month: '2-digit', day: '2-digit' }
      }),
    time: time ??
      formatDate(new Date(), {
        locale: 'sv-SE',
        options: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      }),
  };
}

export default function EventFormProvider({ children }: PropsWithChildren) {
  const params = useParams();

  const { addToast } = useToast();

  const { user } = useAuth();
  const { getEventDetails, saveDraft } = useEvent();

  const { formGroup, loading } = createEventForm();

  const [eventId, setEventId] = useState(params.eventId);
  const [eventDetails, setEventDetails] = useState<Event>();
  const [loadingDetails, setLoadingDetails] = useState(Boolean(eventId));

  const context = useMemo<EventFormContextConfig>(() => ({
    loading,
    eventDetails,
    formGroup,
    saveDraft: () => middlewareSaveDraft()
  }), [formGroup, loading, eventDetails]);

  useEffect(() => {
    if (!eventId) { return; }
    setLoadingDetails(true);

    getEventDetails(eventId)
      .then(event => setEventDetails(event))
      .finally(() => setLoadingDetails(false));
  }, []);

  useEffect(() => {
    if (!eventDetails) { return; }
    initForm(eventDetails);
  }, [eventDetails]);

  async function initForm(event: Event) {
    const file = await urlToFile(
      event.image,
      'capa.jpg',
    );

    formGroup.setValues({
      image: file,
      name: event.name,
      address: event.address,
      tickets: event.tickets,
      capacity: event.capacity,
      description: event.description,
      subject: toEnum(Subject, event.subject),
      category: toEnum(Category, event.category),
      endDate: event.schedule.endDate.toISOString().split('T')[0],
      endTime: event.schedule.endDate.toISOString().split('T')[1].slice(0, 5),
      startDate: event.schedule.startDate.toISOString().split('T')[0],
      startTime: event.schedule.startDate.toISOString().split('T')[1].slice(0, 5),
    });
  }

  const preAction = async () => {
    const values = formGroup.values;

    if (!values.name) {
      addToast({
        delay: 50000,
        color: 'warning',
        message: 'É preciso adicionar um "nome" para salvar o rascunho',
        icon: <Icon name="info-circle" />
      });
      return;
    }

    const id = eventId || eventServices.generateId(values.name);

    const file = values.image;

    const start = getFallbackDate(values.startDate, values.startTime);
    const end = getFallbackDate(values.endDate, values.endTime);

    let url = '';

    if (file) {
      const ext = getExtension(file.name);
      const name = `capa.${ext}`;

      url = await storage.upload({
        file,
        path: `${user?.id}/${id}/${name}`
      });
    }

    return { id, url, values, start, end, };
  };

  const middlewareSaveDraft = async () => {
    const pre = await preAction();

    if (!pre) { return; }

    const { id, url, values, start, end } = pre;

    saveDraft({
      id,
      image: url,
      ownerId: user?.id,
      name: values.name ?? '',
      capacity: values.capacity ?? Infinity,
      subject: values.subject ? toEnum(Subject, values.subject) : '' as any,
      category: values.category ? toEnum(Category, values.category) : '' as any,
      description: values.description ?? '',
      tickets: values.tickets ?? [],
      address: values.address ?? {} as any,
      status: eventDetails?.status || 'draft',
      schedule: {
        startDate: new Date(`${start.date}T${start.time}`),
        endDate: new Date(`${end.date}T${end.time}`),
      },
    }).then(({ id }) => setEventId(id));
  };

  return (
    <EventFormContext value={context}>
      {
        loadingDetails && (
          <div>Carregando...</div>
        )
      }
      {!loadingDetails && children}
    </EventFormContext>
  );
}