import { useContext } from 'react';

import { RolesContext } from './RolesProvider';

export default function useRoles() {
  return useContext(RolesContext);
}