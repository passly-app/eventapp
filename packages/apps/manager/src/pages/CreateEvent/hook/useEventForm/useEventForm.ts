import { useState } from 'react';

import { useForm } from '@iziui/react/lab/Form';

import { type Event, useEvent } from '@eventapp/modules/event';
import { useAuth } from '@eventapp/modules/auth';

export function useEventForm() {
  const { user } = useAuth();
  const { createEvent } = useEvent();

  const [loading, setLoading] = useState(false);

  const formGroup = useForm<Partial<Omit<Event, 'id' | 'ownerId' | 'image'> & { image: File[] }>>({
    form: {
      name: { defaultValue: '' },
      subject: { defaultValue: undefined },
      category: { defaultValue: undefined },
      image: { defaultValue: [] },
      description: { defaultValue: '' },
      tickets: { defaultValue: [] },
      address: { defaultValue: {} },
      schedule: {
        defaultValue: {
          endDatetime: new Date(),
          startDatetime: new Date()
        }
      },
    },
    handle: {
      submit: ({ values }) => {
        if (!user) { return; }
        setLoading(true);

        return createEvent({
          ...values,
          ownerId: user.email
        }).finally(() => setLoading(false));
      }
    }
  }, []);

  return {
    loading,
    formGroup
  };
}