import { useContext } from 'react';

import { EventContext } from './EventProvider';

export default function useEvent() {
  return useContext(EventContext);
}