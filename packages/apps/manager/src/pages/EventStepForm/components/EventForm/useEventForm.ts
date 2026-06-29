import { useContext } from 'react';

import { EventFormContext } from './EventFormProvider';

export default function useEventForm() {
  return useContext(EventFormContext);
}