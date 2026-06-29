import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FormGroup } from '@iziui/react/lab/Form';

import { urlToFile } from '@eventapp/toolkit/file';
import { toEnum } from '@eventapp/toolkit/enum';

import { Category, type Event, Subject, useEvent } from '@eventapp/modules/event';

import type { EventForm } from './interface';
import { createEventForm } from './createEventForm';

interface EventFormContextConfig {
  loading: boolean;
  formGroup: FormGroup<Partial<EventForm>>;
}

export const EventFormContext = createContext<EventFormContextConfig>({
  loading: false,
  formGroup: new FormGroup({}, {})
});

export default function EventFormProvider({ children }: PropsWithChildren) {
  const { eventId } = useParams();

  const { getEventDetails } = useEvent();

  const { formGroup, loading } = createEventForm();

  const [eventDetails, setEventDetails] = useState<Event>();
  const [loadingDetails, setLoadingDetails] = useState(Boolean(eventId));

  const context = useMemo<EventFormContextConfig>(() => ({
    loading,
    formGroup,
  }), [formGroup, loading]);

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

    console.log('>>> aqui', event);

    formGroup.setValues({
      image: file,
      name: event.name,
      address: event.address,
      subject: toEnum(Subject, event.subject),
      category: toEnum(Category, event.category),
    });
  }

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