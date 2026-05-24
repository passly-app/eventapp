
import Stack from '@iziui/react/Stack';

import { useRoles } from '@eventapp/modules/roles';

export default function RolesChip() {

  const { roles } = useRoles();

  return (
    <Stack>
      {roles.map(a => (
        <div key={a.id}>{a.name}</div>
      ))}
    </Stack>
  );
}