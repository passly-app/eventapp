import { createContext, PropsWithChildren, useMemo } from 'react';

import { FormGroup } from '@iziui/react/lab/Form';

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
  const { formGroup, loading } = createEventForm();

  const context = useMemo<EventFormContextConfig>(() => ({
    loading,
    formGroup,
  }), [formGroup, loading]);

  return (
    <EventFormContext value={context}>
      {children}
    </EventFormContext>
  );
}