import { useState } from 'react';

import { useForm } from '@iziui/react/lab/Form';

import { useAuth } from '@eventapp/modules/auth';

import type { EventForm } from './interface';

export function createEventForm() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const formGroup = useForm<Partial<EventForm>>({
    form: {
      name: { defaultValue: '' },
      subject: { defaultValue: undefined },
      category: { defaultValue: undefined },
      image: { defaultValue: undefined },
      description: { defaultValue: '' },
      tickets: { defaultValue: [] },
      address: { defaultValue: undefined },
      startDate: { defaultValue: undefined },
      startTime: { defaultValue: undefined },
      endDate: { defaultValue: undefined },
      endTime: { defaultValue: undefined },
    },
    handle: {
      submit: ({ isValid, values }) => {
        if (!isValid) { return; }
        if (!user) { return; }

        setLoading(true);

        console.log('>>> values', values);

        // return createEvent({
        //   ...values,
        //   ownerId: user.email
        // }).finally(() => setLoading(false));
      }
    },
    validator: {
      name: ({ values }) => {
        const { name } = values;

        if (!name) { return 'Este é um campo obrigatório'; }

        return;
      }
    }
  }, []);

  return {
    loading,
    formGroup
  };
}