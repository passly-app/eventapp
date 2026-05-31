import { useState } from 'react';

import { useForm } from '@iziui/react/lab/Form';

import { useAuth } from '../../auth';
// import useEvent from './useEvent';
import { Category, Subject, type Event } from '../interface';

export interface EventForm {
  name: string;
  description: string;
  image: File;
  subject: Subject;
  category: Category;
  address: Event['address'];
  tickets: Event['tickets'];
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
}

export function useEventForm() {
  const { user } = useAuth();
  // const { createEvent } = useEvent();

  const [loading, setLoading] = useState(false);

  const formGroup = useForm<Partial<EventForm>>({
    form: {
      name: { defaultValue: '' },
      subject: { defaultValue: undefined },
      category: { defaultValue: undefined },
      image: { defaultValue: undefined },
      description: { defaultValue: '' },
      tickets: { defaultValue: [] },
      address: { defaultValue: {} },
      startDate: { defaultValue: undefined },
      startTime: { defaultValue: undefined },
      endDate: { defaultValue: undefined },
      endTime: { defaultValue: undefined },
    },
    handle: {
      submit: ({ values }) => {
        if (!user) { return; }
        setLoading(true);

        console.log('>>> values', values);

        // return createEvent({
        //   ...values,
        //   ownerId: user.email
        // }).finally(() => setLoading(false));
      }
    }
  }, []);

  return {
    loading,
    formGroup
  };
}